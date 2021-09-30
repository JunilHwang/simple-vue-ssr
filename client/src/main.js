import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';

Vue.config.productionTip = false

const router = createRouter();
const store = createStore();

if (window.__INITIAL_STATE__) {
  // We initialize the store state with the data injected from the server
  store.replaceState(window.__INITIAL_STATE__)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

