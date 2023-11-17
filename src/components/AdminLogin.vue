<script setup lang="ts"></script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-4">ログイン画面</h2>

      <form v-on:submit.prevent="login">
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-700 text-sm font-bold mb-2"
            >ユーザーID:</label
          >
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
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

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // ログインのロジックをここに追加
      console.log("Logging in with:", {
        username: this.username,
        password: this.password,
      });
    },
    cancel() {
      // キャンセルのロジックをここに追加
      console.log("Login canceled");
    },
  },
};
</script>

<style scoped>
/* 任意のスタイリングを追加 */
</style>
