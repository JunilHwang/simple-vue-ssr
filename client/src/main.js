import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';

Vue.config.productionTip = false

const router = createRouter();
const store = createStore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

