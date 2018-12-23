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
            id: 2425467916
          },
          {
            name: 'Electric Bill',
            budget: 80,
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
            id: 3462203473
          },
          {
            name: 'Fuel',
            budget: 100,
            id: 4096856227
          },
          {
            name: 'Insurance',
            budget: 150,
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
            id: 3224896798
          },
          {
            name: 'Dining',
            budget: 100,
            id: 5305833339
          }
        ]
      },
      {
        name: 'Quality of Life',
        id: 2649871691,
        categories: [
          {
            name: 'Personal Care',
            budget: 100,
            id: 6948027125
          }
        ]
      }
    ],
    transactions: [
      {
        description: 'McDonalds',
        category: 5305833339,
        date: '2018-11-19T01:36:30',
        amount: -10.42,
        id: 3555507652
      },
      {
        description: 'Dan\'s Barber',
        category: 6948027125,
        date: '2018-11-18T01:36:30',
        amount: -15.67,
        id: 9302307536
      },
      {
        description: 'Work',
        category: 6977591710,
        date: '2018-11-18T01:36:30',
        amount: 2189.45,
        id: 2385943903
      },
      {
        description: 'Starbucks',
        category: 5305833339,
        date: '2018-11-18T01:36:30',
        amount: -6.45,
        id: 4836377084
      },
      {
        description: 'Whole Foods',
        category: 3224896798,
        date: '2018-11-18T01:36:30',
        amount: -45.42,
        id: 4809125196
      }
    ]
  },
  mutations: {
    addCategory: (state, { categoryName, groupId }) => {
      // create object for category
      const category = {
        name: categoryName,
        id: Math.floor(Math.random() * 1000000),
        budget: 0
      }

      // find group to add category
      const group = state.budget.find(obj => obj.id === groupId);

      // add category
      group.categories.push(category);
    },
    addTransaction: (state, { description, category, amount, date, type = 'expense' }) => {
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

      // parse value
      var amount = parseFloat(amount.replace(/[^0-9.-]+/g, ''), 10).toFixed(2);
      amount *= (type === 'expense' ? -1 : 1);

      state.transactions.push({
        description,
        amount,
        category,
        date,
        id: Math.floor(Math.random() * 9999999) // random ID
      });
    }
  },
  getters: {
    budgetSummary(state){
      // TODO: Make date editable
      const date = /^2018-11/;

      const used = state.transactions.reduce((acc, cur) => {
        // Skip income
        if(cur.amount > 0) return acc;

        // Skip transactions not in current month
        if(!date.test(cur.date)) return acc;

        return acc + Math.abs(cur.amount)
      }, 0).toFixed(0);

      const budgetted = state.budget.reduce((acc, cur) => {
        return acc + cur.categories.reduce((acc, cur) => acc + cur.budget, 0)
      }, 0);

      return {
        budgetted,
        used,
        available: budgetted - used
      }
    },
    calculatedBudget(state){
      // add total from all transactions
      const totals = {}
      state.transactions.forEach(transaction => {
        const categoryId = transaction.category.toString();

        if(typeof totals[categoryId] !== 'number'){
          totals[categoryId] = 0;
        }
        
        totals[categoryId] += transaction.amount;
      });

      // add totals to budget
      return state.budget.map(group => {
        return {
          ...group,
          categories: group.categories.map(category => {
            return {
              ...category,
              expenses: totals[category.id.toString()] || 0
            }
          })
        }
      });
    },
    transactions(state){
      // seperate categories from groups
      const categories = state.budget.map(group => group.categories).reduce((a, c) => a.concat(c));

      return state.transactions.map(transaction => {
        const category = categories.find(cat => cat.id === transaction.category);

        return {
          ...transaction,
          categoryName: category ? category.name : 'Unknown Category'
        };
      }).sort((a, b) => {
        // sort by recent transaction date
        if(a.date < b.date) return 1;
        if(a.date > b.date) return -1;
        return 0;
      });
    }
  }
});