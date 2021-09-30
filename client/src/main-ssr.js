import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';

export default (context) => new Promise((resolve, reject) => {

  const router = createRouter();
  const store = createStore();

  router.push(context.url);

  router.onReady(() => {

    const app = new Vue({
      router,
      store,
      render: h => h(App)
    });

    resolve(app);

  })
})

