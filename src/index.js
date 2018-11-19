import Vue from 'vue';
import router from './router';

Vue.directive('focus', {
  bind: function(el){
    Vue.nextTick(function(){
      el.focus();
    });
  }
});

new Vue({
  router,
  el: '#app',
  template: '<router-view/>'
})