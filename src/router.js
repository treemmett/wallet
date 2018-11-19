import Vue from 'vue';
import Router from 'vue-router';

// views
import Budget from './views/budget';
import Transactions from './views/transactions';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Budget,
    name: 'budget'
  },{
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