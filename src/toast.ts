import vue from 'vue';
import Toaster from './components/Toaster.vue';
import toastEvents from './utils/toastEvents';

export default {
  install(Vue: typeof vue) {
    Vue.component('toaster', Toaster);

    Vue.prototype.$toast = (params: string | Rudget.ToastOptions) => {
      toastEvents.$emit('add', params);
    };
  }
};
