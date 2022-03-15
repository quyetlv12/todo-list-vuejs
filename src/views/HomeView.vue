<template>
  <main>
    <InputAddTask />
    <TaskList />
  </main>
</template>
<script>
import InputAddTask from "../components/InputAddTask.vue";
import TaskList from "../components/TaskList.vue";
import { GET_TODO, SUCCESS } from "../configs";
import { todoListService } from "../services/todoListService";
import { store } from "../store/store";
export default {
  components: {
    InputAddTask,
    TaskList,
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await todoListService.getAllTodo();
      if (res.status === SUCCESS) {
        store.commit(GET_TODO, res.data);
      }
    },
  },
  watch: {
    async fetch() {
      const res = await todoListService.getAllTodo();
      if (res.status === SUCCESS) {
        store.commit(GET_TODO, res.data);
      }
    },
  },
  computed: {
    todo() {
      return this.$store.state.todo;
    },
  },
};
</script>
