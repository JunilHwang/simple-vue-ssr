import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';

export default (context) => new Promise(async (resolve, reject) => {

  const router = createRouter();
  const store = createStore();

  await router.push(context.url);

  router.onReady(() => resolve(
    new Vue({
      router,
      store,
      render: h => h(App)
    }))
  );
})

