import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      {
        name: 'Rent',
        id: 2425467916,
        parent: 4179322703
      },
      {
        name: 'Electric Bill',
        id: 1836338723,
        parent: 4179322703
      },
      {
        name: 'Auto Loan',
        id: 3462203473,
        parent: 9716634112
      },
      {
        name: 'Fuel',
        id: 4096856227,
        parent: 9716634112
      },
      {
        name: 'Insurance',
        id: 9401003545,
        parent: 9716634112
      },
      {
        name: 'Groceries',
        id: 3224896798,
        parent: 1868312036
      },
      {
        name: 'Dining',
        id: 5305833339,
        parent: 1868312036
      },
      {
        name: 'Personal Care',
        id: 6948027125,
        parent: 2649871691
      }
    ],
    date: { 
      month: moment().month(),
      prettyMonth: moment().format('MMM'),
      year: moment().year()
    },
    groups: [
      {
        name: 'Housing',
        id: 4179322703
      },
      {
        name: 'Transportation',
        id: 9716634112
      },
      {
        name: 'Food',
        id: 1868312036
      },
      {
        name: 'Quality of Life',
        id: 2649871691
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
    ],
  },
  mutations: {
    addCategory: (state, { categoryName, groupId }) => {
      state.categories.push({
        name: categoryName,
        id: Math.floor(Math.random() * 999999) + 100000,
        parent: groupId
      });
    },
    addTransaction: (state, { description, category, amount, date, type = 'expense' }) => {
      // parse value
      var amount = parseFloat(amount.replace(/[^0-9.-]+/g, ''), 10).toFixed(2);
      amount *= (type === 'expense' ? -1 : 1);

      state.transactions.push({
        description,
        amount,
        category: parseInt(category, 10),
        date,
        id: Math.floor(Math.random() * 9999999) // random ID
      });
    },
    changeDate: (state, { direction }) => {
      const timeObj = moment().year(state.date.year).month(state.date.month);

      if(direction > 0){
        timeObj.add(1, 'month');
      }else if(direction < 0){
        timeObj.subtract(1, 'month');
      }

      state.date.month = timeObj.month();
      state.date.prettyMonth = timeObj.format('MMM');
      state.date.year = timeObj.year();
    }
  },
  getters: {
    budget(state){
      const date = new RegExp(`^${state.date.year}-${state.date.month}`);

      // add total from all transactions
      const totals = state.transactions.reduce((acc, cur) => {
        // skip income
        if(cur.amount > 0) return acc;

        // only check transactions in the selected month
        if(!date.test(cur.date)) return acc;

        const amount = Math.abs(cur.amount);

        // add amount to groups totals
        const id = cur.category.toString();
        if(acc.cat[id]){
          acc.cat[id] += amount;
        }else{
          acc.cat[id] = amount;
        }

        // add amount to global total
        acc.used += amount;

        return acc;
      }, {
        cat: {},
        used: 0,
        budgetted: 0
      });

      return {
        available: (totals.budgetted - totals.used).toFixed(0),
        budgetted: totals.budgetted.toFixed(0),
        used: totals.used.toFixed(0),
        groups: state.groups.map(group => {
          return {
            ...group,
            categories: state.categories.reduce((acc, cur) => {
              // skip categories not in group
              if(cur.parent !== group.id) return acc;
  
              acc.push({
                ...cur,
                expenses: totals.cat[cur.id.toString()] || 0
              });
  
              return acc;
            }, [])
          }
        })
      }
    },
    transactions(state){
      // seperate categories from groups

      return state.transactions.map(transaction => {
        const category = state.categories.find(cat => cat.id === transaction.category);

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