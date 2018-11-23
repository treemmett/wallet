import Vue from 'vue';
import router from './router';
import store from './store';

Vue.directive('focus', {
  bind: function(el){
    Vue.nextTick(function(){
      el.focus();
    });
  }
});

new Vue({
  router,
  store,
  el: '#app',
  template: '<router-view/>'
})