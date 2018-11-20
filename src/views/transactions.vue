<template>
  <Dashboard>
    <div class="list">
      <div class="transaction" v-for="item in transactions" :key="item.id">
        <div class="vendor">{{item.vendor}}</div>
        <div class="category">{{item.category}}</div>
        <div class="amount" :class="{ positive: item.amount > 0 }">{{item.amount}}</div>
      </div>
    </div>
    <Fab><span class="icon-plus"/></Fab>
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
