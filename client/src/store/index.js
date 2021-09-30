import { createStore } from 'vuex'

export default createStore({
  state: {
    todoItems: [
      { id: 1, content: 'CSR을 만들어보자', activation: true },
      { id: 2, content: 'CSR 코드 분할', activation: false },
      { id: 3, content: 'SSR을 만들어보자', activation: false },
    ],
  },
  mutations: {
    SET_TODO_ITEMS (state, todoItems) {
      state.todoItems = todoItems;
    }
  },
});

