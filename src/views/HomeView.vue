<template>
  <main>
    <!-- <span>{{ todo }}</span> -->
    <InputAddTask />
    <TaskList />
  </main>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import InputAddTask from "../components/InputAddTask.vue";
import TaskList from "../components/TaskList.vue";
import { SUCCESS } from "../configs";
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
        store.commit("setTodo", res.data);
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
