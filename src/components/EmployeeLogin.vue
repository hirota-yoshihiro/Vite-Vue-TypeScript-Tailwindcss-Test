<script setup lang="ts">
// import axios from "axios";
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-4">ログイン画面</h2>

      <form v-on:submit.prevent="login">
        <div class="mb-4">
          <label
            for="user_id"
            class="block text-gray-700 text-sm font-bold mb-2"
            >ユーザーID:</label
          >
          <input
            v-model="user_id"
            type="text"
            id="user_id"
            name="user_id"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div class="mb-4">
          <label
            for="password"
            class="block text-gray-700 text-sm font-bold mb-2"
            >パスワード:</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div class="flex justify-between items-center">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
          >
            OK
          </button>
          <button
            type="button"
            v-on:click="cancel"
            class="text-gray-600 hover:text-gray-800 hover:bg-red-300 px-4 py-2 rounded focus:outline-none"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      user_id: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const user_id = this.user_id;
      const password = this.password;
      console.log(user_id, password, BACKEND_URL);
      try {
      } catch (err) {}
    },
    async cancel() {
      // キャンセルのロジックをここに追加
      console.log("Login canceled");
    },
  },
};
</script>

<style scoped>
/* 任意のスタイリングを追加 */
</style>
