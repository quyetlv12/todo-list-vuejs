<template>
  <div class="flex flex-col">
    {{ task }}
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
      <div class="inline-block min-w-full align-middle">
        <div class="overflow-hidden">
          <table
            class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700"
          >
            <thead class="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center"></div>
                </th>
                <th
                  scope="col"
                  class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                >
                  Tên công việc
                </th>
                <th
                  scope="col"
                  class="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400 w-[150px] text-center"
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
            >
              <tr
                class="hover:bg-gray-100 dark:hover:bg-gray-700"
                v-for="todo in todos"
                :key="todo.id"
                :class="[
                  status && todo.id === edit.id ? 'border border-red-500' : '',
                ]"
              >
                <td class="px-4 py-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-1"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      v-model="todo.completed"
                      @click="doneTask(todo)"
                    />
                    <label for="checkbox-table-1" class="sr-only"
                      >checkbox</label
                    >
                  </div>
                </td>

                <td
                  class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  :class="[todo.completed ? 'line-through' : 'no-underline']"
                >
                  <input
                    type="text"
                    class="p-2 w-full focus:border-green-400"
                    v-if="status && todo.id === edit.id"
                    placeholder="Chỉnh sửa công việc ..."
                    v-model="name"
                  />
                  <div
                    v-if="!status"
                    :class="[todo.completed ? 'line-through' : 'no-underline']"
                  >
                    {{ todo.name }}
                  </div>
                </td>
                <td
                  class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap flex"
                >
                  <ButtonAddTask
                    title="Xoá"
                    type="button"
                    v-show="!status && todo.id !== edit.id"
                    classProps="from-red-400 via-red-500 to-red-600"
                    @click="deleteTask(todo.id)"
                  />
                  <ButtonAddTask
                    title="Cập nhật"
                    v-show="!status && todo.id !== edit.id"
                    classProps="from-purple-500 via-purple-600 to-purple-700"
                    :disabled="todo.completed"
                    @click="editTask(todo)"
                  />
                  <ButtonAddTask
                    title="sua"
                    v-show="status && todo.id === edit.id"
                    classProps="from-purple-500 via-purple-600 to-purple-700"
                    :disabled="todo.completed"
                    @click="updateTask(todo)"
                  />
                  <ButtonAddTask
                    title="Huỷ"
                    v-show="status && todo.id === edit.id"
                    classProps="from-purple-500 via-purple-600 to-purple-700"
                    :disabled="todo.completed"
                    @click="cancelUpdate"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/runtime-core";
import {
  DELETE_TODO,
  SUCCESS,
  TASK_SELECT,
  UPDATE_STATUS,
  UPDATE_TASK,
} from "../configs";
import { todoListService } from "../services/todoListService";
import { store } from "../store/store";
import ButtonAddTask from "./ButtonAddTask.vue";
export default {
  data() {
    return {
      name: "",
    };
  },
  components: {
    ButtonAddTask,
  },
  methods: {
    async doneTask(todo) {
      await todoListService.doneTask(todo.id, {
        completed: !todo.completed,
      });
    },
    async deleteTask(id) {
      const res = await todoListService.deleteTask(id);
      if (res.status === SUCCESS) {
        store.commit(DELETE_TODO, res.data);
      }
    },
    async editTask(todos) {
      const todo = { ...todos };
      this.$data.name = todo.name;
      store.commit(TASK_SELECT, { ...todos });
      store.commit(UPDATE_STATUS, { ...todos });
    },
    async updateTask(todo) {
      const task = {
        ...todo,
        name: this.$data.name,
      };
      store.commit(UPDATE_TASK, task);
      const res = await todoListService.update(task.id, task);
      if (res.status === SUCCESS) {
        store.commit(TASK_SELECT, {});
        store.commit(UPDATE_STATUS, "");
      }
    },
    async cancelUpdate() {
      store.commit(TASK_SELECT, {});
      store.commit(UPDATE_STATUS, "");
    },
  },
  computed: {
    todos() {
      return this.$store.state.todo;
    },
    edit() {
      return this.$store.state.edit;
    },
    status() {
      return this.$store.state.status;
    },
  },
  watch: {
    getTodos() {
      return this.$store.state.todo;
    },
  },
};
</script>
<style lang="stylus" scoped></style>
