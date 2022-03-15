<template>
  <div class="p-2 flex items-center gap-2">
    <input
      v-model="name"
      class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
      placeholder="Nhập công việc cần làm ..."
    />
    <ButtonAddTask title="Thêm" @click="addTodo" />
  </div>
</template>

<script setup>
import { defineComponent, ref } from "@vue/runtime-core";
import ButtonAddTask from "./ButtonAddTask.vue";
import {store} from '../store/store'
import { todoListService } from "../services/todoListService";
import { CREATED, SUCCESS } from "../configs";
defineComponent({
  ButtonAddTask,
});
const name = ref('')
const addTodo =async () =>{
  const res = await todoListService.addTodo({name : name._value , completed : false})
  console.log(res);
  if(res.status === CREATED){
      store.commit('add' , res.data)
  }
}
</script>

<style lang="scss" scoped></style>
