import Vue from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import { ModalPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import store from './store';

Vue.use(ModalPlugin);
Vue.component('vue-json-pretty', VueJsonPretty);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
