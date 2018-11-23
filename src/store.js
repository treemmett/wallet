import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    ],
    transactions: [
      {
        description: 'McDonalds',
        category: 'Dining',
        date: '2018-11-19T01:36:30',
        amount: -10.42,
        id: 3555507652
      },
      {
        description: 'Dan\'s Barber',
        category: 'Personal Care',
        date: '2018-11-18T01:36:30',
        amount: -15.67,
        id: 9302307536
      },
      {
        description: 'Work',
        category: 'Income',
        date: '2018-11-18T01:36:30',
        amount: 2189.45,
        id: 2385943903
      }
    ]
  },
  mutations: {
    addCategory: (state, { categoryName, groupId }) => {
      // create object for category
      const category = {
        name: categoryName,
        id: Math.floor(Math.random() * 1000000),
        budget: 0,
        expenses: 0
      }

      // find group to add category
      const group = state.budget.find(obj => obj.id === groupId);

      // add category
      group.categories.push(category);
    },
    addTransaction: (state, { description, category, amount }) => {
      // find category of transaction
      let categoryObj;
      for(let i = 0; i < state.budget.length; i++){
        const foundCategory = state.budget[i].categories.find(obj => parseInt(category, 10));
        if(foundCategory){
          categoryObj = foundCategory;
          break;
        }
      }

      if(!categoryObj){
        throw new Error('Category does not exist');
      }

      state.transactions.push({
        description,
        amount,
        category,
        id: Math.floor(Math.random() * 9999999) // random ID
      });
    }
  }
});