import Vue from 'vue';
import Router from 'vue-router';

// views
import Budget from './views/budget';
import Income from './views/income';
import Transactions from './views/transactions';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Budget,
    name: 'budget'
  },
  {
    path: '/income',
    component: Income,
    name: 'income'
  },
  {
    path: '/transactions',
    component: Transactions,
    name: 'transactions'
  }
];

const router = new Router({
  routes,
  mode: 'history'
});

export default router;
