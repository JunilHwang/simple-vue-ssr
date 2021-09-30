const store = {
  state: {
    todoItems: [
      { id: 1, content: 'CSR을 만들어보자', activation: true },
      { id: 2, content: 'CSR 코드 분할', activation: true },
      { id: 3, content: 'SSR을 만들어보자', activation: false },
    ],
  },
  setState (newState) {
    this.state = { ...this.state, ...newState };
  }
}

module.exports = store;
