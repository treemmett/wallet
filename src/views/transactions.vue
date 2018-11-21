<template>
  <Dashboard>
    <div class="list">
      <div class="transaction" v-for="item in transactions" :key="item.id">
        <div class="vendor">{{item.vendor}}</div>
        <div class="category">{{item.category}}</div>
        <div class="amount" :class="{ positive: item.amount > 0 }">{{item.amount}}</div>
      </div>

      <Fab>+</Fab>
    </div>

    <div class="info">
      <form>
        <label>Description</label>
        <input/>

        <label>Category</label>
        <select>
          <option>Dining</option>
          <option>Personal Care</option>
          <option>Rent</option>
        </select>

        <label>Amount</label>
        <input/>

        <div class="right">
          <input type="button" value="Cancel"/>
          <input type="submit" value="Save"/>
        </div>
      </form>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from '../layouts/dashboard';
import Fab from '../components/fab';

export default {
  name: 'Transactions',
  components: {
    Dashboard,
    Fab
  },
  data(){
    return {
      transactions: [
        {
          vendor: 'McDonalds',
          category: 'Dining',
          date: '2018-11-19T01:36:30',
          amount: -10.42,
          id: 3555507652
        },
        {
          vendor: 'Dan\'s Barber',
          category: 'Personal Care',
          date: '2018-11-18T01:36:30',
          amount: -15.67,
          id: 9302307536
        },
        {
          vendor: 'Work',
          category: 'Income',
          date: '2018-11-18T01:36:30',
          amount: 2189.45,
          id: 2385943903
        }
      ]
    }
  }
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

    label{
      display: block;
      color: #888;
      font-size: 14px;
      margin-bottom: 0.25em;

      &:not(:first-of-type){
        margin-top: 0.75em;
      }
    }

    input:not([type=submit]):not([type=button]), select{
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

    input:not([type=submit]):not([type=button]){
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
