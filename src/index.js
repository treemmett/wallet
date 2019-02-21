import Vue from 'vue';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import router from './router';
import store from './store';
import formatCurrency from './mixins/formatCurrency';

Vue.directive('focus', {
  bind(el) {
    Vue.nextTick(() => {
      el.focus();
    });
  }
});

// Load mixins
Vue.mixin(formatCurrency);

// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  el: '#app',
  template: '<router-view/>'
});

// register service worker
if ('serviceWorker' in navigator) {
  runtime.register();
}
