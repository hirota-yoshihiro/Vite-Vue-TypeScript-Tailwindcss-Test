<script setup lang="ts">
import Header from "./components/views/header/Header.vue";
import Footer from "./components/views/footer/Footer.vue";
</script>

<template>
  <Header></Header>
  <router-view />
  <Footer></Footer>
</template>

<style scoped></style>
