import Vue from 'vue';
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
