import { createRouter, createWebHistory } from 'vue-router'

import Home from "../views/Home.vue";
import NotFound from "../views/NotFound";
import TodoList from "../views/TodoList";

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    }
  ]
});

