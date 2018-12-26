<template>
  <Dashboard>
    <div class="list">
      <div class="transaction" v-for="item in $store.getters.transactions" :key="item.id">
        <div class="description">{{item.description}}</div>
        <div class="category">{{item.categoryName}}</div>
        <div class="amount" :class="{ positive: item.amount > 0 }">{{formatCurrency(item.amount)}}</div>
      </div>
    </div>

    <transition name="animation">
      <div class="sidebar" v-if="sidebarOpen" @click.self="sidebarOpen = false">
        <div class="card">
          <form @submit.prevent="addTransaction">
            <label for="description">Description</label>
            <input class="input" name="description" id="description" required/>

            <label for="category">Category</label>
            <select class="input" name="category" id="category" required>
              <option disabled selected/>
              <optgroup v-for="group in $store.getters.budget.groups" :key="group.id" :label="group.name">
                <option v-for="category in group.categories" :key="category.id" :value="category.id">{{category.name}}</option>
              </optgroup>
            </select>

            <label for="amount">Amount</label>
            <input class="input" type="tel" name="amount" required/>

            <label for="date">Date</label>
            <v-date-picker mode="single" v-model="selectedDetail.date" update-on-input :input-props="{ class: 'input', required: true, name: 'date' }"/>

            <label>Type</label>
            <div class="radio">
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
import moment from 'moment';

export default {
  name: 'Transactions',
  data(){
    return {
      sidebarOpen: false,
      selectedDetail: {
        date: null
      }
    }
  },
  components: {
    Dashboard,
    Fab
  },
  methods: {
    addTransaction(e){
      // parse date object
      const date = moment(e.target.elements.date.value, 'MM/DD/YYYY').toISOString();

      this.$store.commit('addTransaction', {
        description: e.target.elements.description.value.trim(),
        category: e.target.elements.category.value.trim(),
        amount: e.target.elements.amount.value.trim(),
        type: e.target.elements.type.value,
        date
      });

      // close sidebar
      this.sidebarOpen = false;
    }
  }
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
    width: 25em;
    height: 100%;
    padding: 0 2em;
    box-sizing: border-box;
    pointer-events: none;
    overflow-y: auto;

    .card{
      background-color: #fff;
      border-radius: 6px;
      padding: 1em;
      margin: 2em 0;
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
      width: 100%;
      z-index: 7;
      background-color: rgba(#000, 0.3);
      transition: background-color 0.4s ease;
      pointer-events: auto;

      .card{
        box-shadow: 0 5px 20px 5px 3px rgba(#000, 0.1);
        padding: 1.5em;
        max-width: 25em;
        margin: auto;
        margin-top: 6em;
        transition: transform 0.4s ease-out, box-shadow 0.4s ease-out, opacity 0.4s ease;
      }

      &.animation-enter, &.animation-leave-to{
        background-color: rgba(#000, 0.0);

        .card{
          transform: translateY(100%);
          box-shadow: none;
          opacity: 0;
        }
      }

      &.animation-leave-to{
        transition: background-color 0.3s ease;

        .card{
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, opacity 0.3s ease;
        }
      }
    }
  }
</style>
