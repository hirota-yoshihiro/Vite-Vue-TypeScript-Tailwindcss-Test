<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <div class="relative">
    <div class="fixed justify-center top-0 w-64 h-screen bg-white">
      <Sidebar />
    </div>
    <div class="h-screen bg-gray-100"></div>
  </div>
</template>
