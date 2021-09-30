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
    }
  },
}
</script>

<style scoped></style>