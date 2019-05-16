import Vue from 'vue';
import Router from 'vue-router';
import Budget from './views/Budget.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
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
          name: 'registration',
          meta: {
            public: true
          }
        }
      ],
      meta: {
        public: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.public) {
    return next();
  }

  if (store.state.session.loggedIn) {
    return next();
  }

  return next({
    name: 'login'
  });
});

export default router;
