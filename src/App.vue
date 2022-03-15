<script setup>
import { RouterLink, RouterView } from "vue-router";
import TaskList from "./components/TaskList.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>
<template>
  <div>
    <Header />
    <main class="px-16 mb-[50px]">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
/* @import '@/assets/base.css'; */
</style>
