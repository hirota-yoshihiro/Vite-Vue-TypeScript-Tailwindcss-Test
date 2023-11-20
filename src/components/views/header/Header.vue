<template>
  <header class="bg-white text-white p-4 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <!-- 従業員画像 -->
      <img
        v-if="isLoggedIn && employeeImage"
        :src="employeeImage"
        alt="Employee"
        class="rounded-full h-8 w-8"
      />

      <!-- 従業員名 -->
      <span v-if="isLoggedIn">{{ employeeName }}</span>
    </div>

    <!-- ログイン/ログアウトボタン -->
    <button
      @click="toggleLoginStatus"
      class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded"
    >
      {{ isLoggedIn ? "ログアウト" : "ログイン" }}
    </button>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

// ダミーの従業員情報
const employeeName = ref("John Doe");
const employeeImage = ref("/path/to/employee-image.jpg");
const isLoggedIn = ref(false);

// ログイン状態の切り替え
const toggleLoginStatus = () => {
  isLoggedIn.value = !isLoggedIn.value;
};
</script>

<style scoped>
/* 必要なスタイリングを追加 */
</style>
