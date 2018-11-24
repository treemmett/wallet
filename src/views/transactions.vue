<template>
  <Dashboard>
    <div class="list">
      <div class="transaction" v-for="item in $store.state.transactions" :key="item.id">
        <div class="description">{{item.description}}</div>
        <div class="category">{{item.category}}</div>
        <div class="amount" :class="{ positive: item.amount > 0 }">{{item.amount}}</div>
      </div>
    </div>

    <div class="info">
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
          <input type="button" value="Cancel"/>
          <input type="submit" value="Save"/>
        </div>
      </form>
    </div>
    <Fab>+</Fab>
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
      })
    }
  },
  directives: { money: VMoney }
}
</script>

<style lang="scss" scoped>
  @import '../colors';

  .list{
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    padding: 2em;
    padding-right: 25em;
    box-sizing: border-box;
    overflow: auto;
    height: 100%;
  }

  .info{
    position: absolute;
    right: 0;
    display: inline-block;
    padding: 1em;
    box-sizing: border-box;
    width: 21em;
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    border-radius: 6px;
    margin-right: 2em;

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
        padding: 0.25em 0.5em;
        border: 1px solid #ccc;
        border-right: none;
        border-radius: 6px;
        transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, color 0.15s ease-in-out;

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

    input:not([type]), input[type=tel]{
      transition: box-shadow 0.1s ease-in-out, border-color 0.1s ease-in-out;

      &:focus{
        $blue: #11aaff;
        box-shadow: 0 0 1px $blue;
        border-color: $blue;
      }
    }

    .right{
      margin-top: 0.75em;
      text-align: right;

      input{
        font-size: 16px;
        border-radius: 5px;
        outline: none;
        padding: 0.5em 1em;
        margin-left: 0.5em;
        cursor: pointer;

        &[type=submit]{
          background: $blue-gradient;
          color: #fff;
          border: none;
          transition: background-color 0.15s ease;
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
</style>
