<template>
  <ul>
    <li
      v-for="{ id, content, activation } in todoItems"
      @click="toggle(id)"
    >
      <input type="checkbox" :checked="activation" />
      <span
        :style="{
          textDecoration: activation ? 'line-through' : 'none'
        }"
        v-html="content"
      />
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";

const pageTitle = "TodoList | Vue SSR";

export default {
  name: "TodoList",

  computed: {
    ...mapState(['todoItems']),
  },

  methods: {
    ...mapMutations(['SET_TODO_ITEMS']),

    toggle (id) {
      const todoItems = [ ...this.todoItems ];
      const selectedItem = todoItems.find(v => v.id === id);
      selectedItem.activation = !selectedItem.activation;
      this.SET_TODO_ITEMS(todoItems);
      axios.put("/api/state", { todoItems });
    }
  },

  serverPrefetch() {
    this.$ssrContext.title = pageTitle;
  },

  mounted() {
    document.title = pageTitle;
    axios.get('/api/state')
         .then(({ data }) => this.SET_TODO_ITEMS(data.todoItems));
  }
}
</script>

<style scoped></style>