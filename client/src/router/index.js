import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from "../views/Home.vue";
import NotFound from "../views/NotFound";
import TodoList from "../views/TodoList";

Vue.use(VueRouter);

export default function createRouter () {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/todo-list',
        name: 'TodoList',
        component: TodoList,
      },
      {
        path: "*",
        name: "NotFound",
        component: NotFound,
      }
    ]
  });
}

