<template>
  <div class="p-2">
    <form @submit="addTodo" class="flex items-center gap-2">
      <input
        v-model="task.name"
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
        placeholder="Nhập công việc cần làm ..."
      />
      <ButtonAddTask
        title="Thêm"
        classProps="from-blue-500 via-blue-600 to-blue-700"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup>
import { computed, defineComponent, reactive, watch } from "@vue/runtime-core";
import { ADD_TODO, CREATED } from "../configs";
import { todoListService } from "../services/todoListService";
import { store } from "../store/store";
import ButtonAddTask from "./ButtonAddTask.vue";
defineComponent({
  ButtonAddTask,
});
let task = reactive({
  name: "",
});
const addTodo = async (e) => {
  e.preventDefault();
  const res = await todoListService.addTodo({
    name: task.name,
    completed: false,
  });
  if (res.status === CREATED) {
    store.commit(ADD_TODO, res.data);
    task.name = "";
  }
};
</script>

<style lang="scss" scoped></style>
