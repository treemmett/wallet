import axios from 'axios';
import { VueConstructor } from 'vue';

// create axios instance
const instance = axios.create({
  baseURL: '/api/'
});

export default {
  install(Vue: VueConstructor) {
    Vue.prototype.$api = instance;
  }
};
