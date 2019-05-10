import Vue from 'vue';
import Router from 'vue-router';
import Budget from './views/Budget.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'budget',
      component: Budget
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      children: [
        {
          path: 'register',
          name: 'registration'
        }
      ]
    }
  ]
});
