import Vue from 'vue';
import Calendar from 'v-calendar';
import router from './router';
import store from './store';
import formatCurrency from './mixins/formatCurrency';
import 'v-calendar/lib/v-calendar.min.css';

Vue.directive('focus', {
  bind(el) {
    Vue.nextTick(() => {
      el.focus();
    });
  }
});

Vue.use(Calendar);

// Load mixins
Vue.mixin(formatCurrency);

// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  el: '#app',
  template: '<router-view/>'
});
