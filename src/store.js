import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

// import getters
import incomeGetter from './ducks/getters/income';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    budget: [
      {
        month: 11,
        year: 2018,
        category: 2425467916,
        amount: 1000
      },
      {
        month: 10,
        year: 2018,
        category: 2425467916,
        amount: 900
      },
      {
        month: 0,
        year: 2019,
        category: 2425467916,
        amount: 400
      }
    ],
    categories: [
      {
        name: 'Rent',
        id: 2425467916,
        parent: 4179322703,
        sort: 0
      },
      {
        name: 'Electric Bill',
        id: 1836338723,
        parent: 4179322703,
        sort: 1
      },
      {
        name: 'Auto Loan',
        id: 3462203473,
        parent: 9716634112,
        sort: 0
      },
      {
        name: 'Fuel',
        id: 4096856227,
        parent: 9716634112,
        sort: 1
      },
      {
        name: 'Insurance',
        id: 9401003545,
        parent: 9716634112,
        sort: 2
      },
      {
        name: 'Groceries',
        id: 3224896798,
        parent: 1868312036,
        sort: 0
      },
      {
        name: 'Dining',
        id: 5305833339,
        parent: 1868312036,
        sort: 1
      },
      {
        name: 'Personal Care',
        id: 6948027125,
        parent: 2649871691,
        sort: 0
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
    income: [
      {
        type: 'salary',
        description: 'Work',
        rate: 52000,
        id: 6481398561
      },
      {
        type: 'hourly',
        description: 'Side Job',
        rate: 12,
        hours: 20,
        id: 4284024853
      }
    ],
    tax: {
      state: 'ut',
      status: 'single'
    },
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
    },
    setBudget: (state, { category, amount }) => {
      // find budget category
      const budget = state.budget.find(b => b.category === category && b.month === state.date.month && b.year === state.date.year);

      // parse budget amount
      amount = parseInt(amount.toString().replace(/[^\d\.]/g, ''), 10);

      if(isNaN(amount)){
        amount = 0;
      }

      if(budget){
        // update budget
        budget.amount = amount;
      }else{
        // create new budget
        state.budget.push({
          month: state.date.month,
          year: state.date.year,
          category,
          amount
        });
      }
    },
    setIncome: (state, { id, rate, hours, description, type }) => {
      // find income
      let income = state.income.find(i => i.id === id);

      if(rate !== undefined){
        Vue.set(income, 'rate', rate);
      }

      if(hours !== undefined){
        Vue.set(income, 'hours', hours);
      }

      if(description !== undefined){
        Vue.set(income, 'description', description);
      }

      if(type !== undefined){
        Vue.set(income, 'type', type);

        // remove floats from rate
        if(income.rate){
          Vue.set(income, 'rate', parseInt(income.rate, 10));
        }
      }

      // set hours if needed
      if(income.type === 'hourly' && !income.hours){
        Vue.set(income, 'hours', 0);
      }
    },
    setTax: (theRealState, { state, status }) => {
      theRealState.tax.state = state || theRealState.tax.state;
      theRealState.tax.status = status|| theRealState.tax.status;
    },
    sortCategory: (state, { parent, oldIndex, newIndex }) => {
      // separate categories, finding siblings
      const categories = state.categories.reduce((acc, cur) => {

        if(cur.parent === parent){
          acc.new.push(cur);
        }else{
          acc.existing.push(cur);
        }

        return acc;
      }, { new: [], existing: [] });

      // sort categories using old order
      categories.new.sort((a, b) => {
        if(a.sort > b.sort) return 1;
        if(a.sort < b.sort) return -1;
        return 0;
      });

      // move element to new position
      const out = categories.new.splice(oldIndex, 1)[0];
      categories.new.splice(newIndex, 0, out);

      // generate new order
      categories.new = categories.new.map((obj, i) => ({...obj, sort: i}));

      // replace state
      state.categories = categories.existing.concat(categories.new);
    }
  },
  getters: {
    budget(state){
      const date = new RegExp(`^${state.date.year}-${moment().month(state.date.month).format('MM')}`);

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
        used: 0
      });

      const budgetted = state.budget.reduce((acc, cur) => {
        if(cur.year === state.date.year && cur.month === state.date.month){
          acc += cur.amount;
        }

        return acc;
      }, 0);

      return {
        available: budgetted - totals.used,
        budgetted,
        used: totals.used,
        groups: state.groups.map(group => {
          return {
            ...group,
            categories: state.categories.slice().sort((a, b) => {
              if(a.sort > b.sort) return 1;
              if(a.sort < b.sort) return -1;
              return 0;
            }).reduce((acc, cur) => {
              // skip categories not in group
              if(cur.parent !== group.id) return acc;
              
              const budget = state.budget.find(b => b.category === cur.id && b.year === state.date.year && b.month === state.date.month);
  
              acc.push({
                ...cur,
                budget: budget ? budget.amount : 0,
                expenses: totals.cat[cur.id.toString()] || 0
              });
  
              return acc;
            }, [])
          }
        })
      }
    },
    income: incomeGetter,
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