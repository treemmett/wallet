import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import toast from './utils/plugins/toast';
import apiPlugin from './utils/plugins/apiPlugin';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(apiPlugin);
Vue.use(toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
