<template>
  <Dashboard>
    <div class="list">
      <div class="transaction" v-for="item in $store.getters.transactions" :key="item.id">
        <div class="description">{{item.description}}</div>
        <div class="category">{{item.categoryName}}</div>
        <div class="amount" :class="{ positive: item.amount > 0 }">{{item.amount}}</div>
      </div>
    </div>

    <transition name="animation">
      <div class="sidebar" v-if="sidebarOpen">
        <div class="card">
          <form @submit.prevent="addTransaction">
            <label for="description">Description</label>
            <input name="description" id="description" required/>

            <label for="category">Category</label>
            <select name="category" id="category" required>
              <option disabled selected/>
              <optgroup v-for="group in $store.state.budget" :key="group.id" :label="group.name">
                <option v-for="category in group.categories" :key="category.id" :value="category.id">{{category.name}}</option>
              </optgroup>
            </select>

            <label for="amount">Amount</label>
            <input type="tel" name="amount" id="amount" v-model.lazy.number="amount" v-money="moneyConfig" required/>

            <label>Type</label>
            <div class="radio-group">
              <input type="radio" name="type" id="expense" value="expense" checked required/>
              <label class="radio-selector" for="expense">Expense</label>
              <input type="radio" name="type" id="income" value="income"/>
              <label class="radio-selector" for="income">Income</label>
            </div>

            <div class="right">
              <input type="button" value="Cancel" @click="sidebarOpen = false"/>
              <input type="submit" value="Save"/>
            </div>
          </form>
        </div>
      </div>
    </transition>
    <Fab @click.native="sidebarOpen = true">+</Fab>
  </Dashboard>
</template>

<script>
import Dashboard from '../layouts/dashboard';
import Fab from '../components/fab';
import { VMoney } from 'v-money';

export default {
  name: 'Transactions',
  data(){
    return {
      sidebarOpen: false,
      amount: 0,
      moneyConfig: {
        prefix: '$',
        precision: 2,
      }
    }
  },
  components: {
    Dashboard,
    Fab
  },
  methods: {
    addTransaction(e){
      this.$store.commit('addTransaction', {
        description: e.target.elements.description.value.trim(),
        category: e.target.elements.category.value.trim(),
        amount: e.target.elements.amount.value.trim(),
        type: e.target.elements.type.value
      });

      // close sidebar
      this.sidebarOpen = false;
    }
  },
  directives: { money: VMoney }
}
</script>

<style lang="scss" scoped>
  @import '../colors';

  .list{
    width: 100%;
    left: 0;
    top: 0;
    padding: 2em;
    padding-right: 25em;
    box-sizing: border-box;
    overflow: auto;
    height: 100%;
  }

  .sidebar{
    position: absolute;
    top: 0;
    right: 0;
    padding: 2em;
    box-sizing: border-box;
    max-height: 100%;
    width: 25em;
    overflow-y: auto;
    pointer-events: none;

    .card{
      background-color: #fff;
      border-radius: 6px;
      padding: 1em;
      box-sizing: border-box;
      pointer-events: auto;
      box-shadow: 0 5px 20px rgba(#000, 0.1);
    }

    label:not(.radio-selector){
      display: block;
      color: #888;
      font-size: 14px;
      margin-bottom: 0.25em;

      &:not(:first-of-type){
        margin-top: 0.75em;
      }
    }

    input:not([type]), input[type=tel], select{
      display: block;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
      font-size: 16px;
      padding: 0.25em 0.5em;
      box-sizing: border-box;
      -webkit-appearance: none;
      outline: none;

      transition: box-shadow 0.1s ease-in-out, border-color 0.1s ease-in-out;

      &:focus{
        $blue: #11aaff;
        box-shadow: 0 0 1px $blue;
        border-color: $blue;
      }
    }

    .radio-group{
      display: flex;

      input[type=radio]{
        position: fixed;
        opacity: 0;

        &:checked + .radio-selector{
          background-color: $orange;
          color: #fff;
          border-color: $orange;
          box-shadow: 0 1px 1px rgba($orange, 0.5);

          & + input + .radio-selector{
            border-left: none;
            padding-left: calc(0.5em + 1px);
          }
        }
      }

      .radio-selector{
        display: inline-block;
        white-space: pre-line;
        padding: 0.4em 0.5em;
        border: 1px solid #ccc;
        border-right: none;
        border-radius: 6px;
        transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;

        &:first-of-type{
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        &:last-of-type{
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-right: 1px solid #ccc;
        }

        &:hover{
          border-color: $orange;
          box-shadow: 0 1px 1px rgba($orange, 0.5);
        }
      }
    }

    option:disabled{
      display: none;
    }

    .right{
      margin-top: 0.75em;
      text-align: right;

      input{
        font-size: 16px;
        border-radius: 10px;
        outline: none;
        padding: 0.75em 1.25em;
        margin-left: 0.5em;
        cursor: pointer;
        transition: background-color 0.15s ease, box-shadow 0.15s ease;
        background-color: #fff;
        border: 1px solid #ccc;
        -webkit-appearance: none;
        -moz-appearance: none;

        &[type=submit]{
          background: $blue;
          color: #fff;
          border: none;

          &:hover{
            box-shadow: 0 1px 1px rgba(darken($blue, 10%), 0.5);
            background-color: darken($blue, 3%);
          }
        }

        &:hover{
          box-shadow: 0 1px 1px rgba(#000, 0.2);
        }
      }
    }
  }

  .transaction{
    position: relative;
    padding: 1em;
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    border-radius: 6px;
    margin-bottom: 1em;

    &:last-child{
      margin-bottom: 0;
    }

    .category{
      color: #757575;
      font-size: 14px;
    }

    .amount{
      position: absolute;
      right: 0;
      padding-right: 1em;
      bottom: 50%;
      transform: translateY(50%);
      font-size: 18px;
      color: #e41e0a;
      font-weight: 500;

      &.positive{
        color: #659157;
      }
    }
  }

  @media screen and (max-width: 700px){
    .list{
      padding-right: 2em;
    }

    .sidebar{
      position: fixed;
      top: auto;
      bottom: 0;
      padding: 0;
      overflow: visible;
      width: 100%;
      z-index: 7;
      transition: transform 0.3s ease-out;

      .card{
        box-shadow: 0 -5px 20px 5px rgba(#000, 0.1);
        padding: 2em;
        border-radius: 2em 2em 0 0 ;
        transition: box-shadow 0.5s ease-out;
      }

      &.animation-enter, &.animation-leave-to{
        transform: translateY(100%);
        
        .card{
          box-shadow: none;
        }
      }
    }

    .sideabar::after{
      content: '';
      display: block;
      position: fixed;
      background-color: #000;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
</style>
