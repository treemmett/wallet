<template>
  <Dashboard>
    <div class="budget-wrapper">
      <div class="budget">
        <div class="group" v-for="group in budget" :key="group.id">
          <div class="head">
            <div class="title">{{group.name}}</div>
            <div class="amount">Budgeted</div>
            <div class="amount">Used</div>
          </div>

          <div class="categories">
            <div class="category" v-for="category in group.categories" :key="category.id">
              <div class="title">{{category.name}}</div>
              <div class="amount">{{formatMoney(category.budget)}}</div>
              <div class="amount">{{formatMoney(category.expenses)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card"/>
  </Dashboard>
</template>

<script>
import Dashboard from '../layouts/dashboard';

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export default {
  name: 'Budget',
  components: {
    Dashboard
  },
  data(){
    return {
      budget: [
        {
          name: 'Housing',
          id: 4179322703,
          categories: [
            {
              name: 'Rent',
              budget: 1000,
              expenses: 1000,
              id: 2425467916
            },
            {
              name: 'Electric Bill',
              budget: 80,
              expenses: 78,
              id: 1836338723
            }
          ]
        },
        {
          name: 'Transportation',
          id: 9716634112,
          categories: [
            {
              name: 'Auto Loan',
              budget: 500,
              expenses: 478,
              id: 3462203473
            },
            {
              name: 'Fuel',
              budget: 100,
              expenses: 27,
              id: 4096856227
            },
            {
              name: 'Insurance',
              budget: 150,
              expenses: 67,
              id: 9401003545
            }
          ]
        },
        {
          name: 'Food',
          id: 1868312036,
          categories: [
            {
              name: 'Groceries',
              budget: 200,
              expenses: 139,
              id: 3224896798
            },
            {
              name: 'Dining',
              budget: 100,
              expenses: 114,
              id: 5305833339
            }
          ]
        }
      ]
    }
  },
  methods: {
    formatMoney(value){
      return moneyFormatter.format(value);
    }
  }
}
</script>

<style lang="scss" scoped>
  .budget-wrapper{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 2em;
    padding-right: 22em;
    box-sizing: border-box;
    overflow: auto;
    height: 100%;

    .group{
      background-color: #fff;
      box-shadow: 0 5px 20px rgba(#000, 0.1);
      border-radius: 6px;
      margin-bottom: 2em;

      &:last-child{
        margin-bottom: 0;
      }

      .head{
        font-size: 20px;
        padding: 1em;
        display: flex;
        align-items: center;

        .amount{
          font-size: 12px;
        }
      }

      .categories{
        border-top: 1px solid #ddd;
        margin: 0 1em;
        font-size: 18px;
      }

      .category{
        display: flex;
        align-items: center;
        padding: 1em 0;
      }

      .title{
        margin-right: auto;
      }

      .amount{
        color: #888;
        width: 100px;
        margin-left: 1em;
      }
    }
  }

  .card{
    position: absolute;
    right: 2em;
    width: 18em;
    max-height: calc(75% - 4em);
    overflow: scroll;
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(#000, 0.1);
    border-radius: 6px;
    padding: 1em;
    box-sizing: border-box;
  }
</style>