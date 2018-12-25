import Vue from 'vue';
import router from './router';
import store from './store';
import Calendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

Vue.directive('focus', {
  bind: function(el){
    Vue.nextTick(function(){
      el.focus();
    });
  }
});

Vue.use(Calendar);

new Vue({
  router,
  store,
  el: '#app',
  template: '<router-view/>'
});