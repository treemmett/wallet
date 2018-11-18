import Vue from 'vue';
import Router from 'vue-router';

// views
import Budget from './views/budget';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Budget,
    name: 'budget'
  }
];

const router = new Router({
  routes,
  mode: 'history'
});

export default router;