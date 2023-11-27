<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import { config } from "../../../config/application.config.js";

const router = useRouter();

const user_id = ref("");
const password = ref("");
const isBackendError = ref(false);
const backendErrorMessage = ref("");

const transitionToAttendanceEntryScreen = () => {
  router.push("/employee/dashboard/attendance-entry");
};

const clear = () => {
  user_id.value = "";
  password.value = "";
  isBackendError.value = false;
  backendErrorMessage.value = "";
};

const login = async () => {
  const EMPLOYEE_LOGIN_ENDPOINT = config.EMPLOYEE_LOGIN_ENDPOINT;

  isBackendError.value = false;
  backendErrorMessage.value = "";

  let response;
  try {
    response = await axios.post(
      EMPLOYEE_LOGIN_ENDPOINT,
      {
        user_id: user_id.value,
        password: password.value,
      },
      {
        withCredentials: true,
      }
    );
  } catch (err: any) {
    const statusCode = err.response.status;

    if (statusCode >= 500) {
      window.alert(err.response.data);
      return;
    }

    if (statusCode === 401) {
      isBackendError.value = true;
      backendErrorMessage.value = err.response.data;
      return;
    }
  }

  // TODO ログインに成功した場合、Vuexという状態管理に従業員情報を保存してヘッダーに表示、入力画面にページ遷移を行う。
  transitionToAttendanceEntryScreen();
};
</script>

<template>
  <main>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        class="bg-white pt-4 pr-8 pl-8 pb-8 rounded shadow-md w-full max-w-md"
      >
        <div
          class="flex justify-end text-blue-400 text-xs underline cursor-pointer"
        >
          <router-link to="/admin/login">管理者ログイン画面</router-link>
        </div>

        <h2 class="text-2xl font-semibold mb-4">ログイン画面</h2>
        <p v-if="isBackendError" class="text-red-600 mb-4">
          {{ backendErrorMessage }}
        </p>

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
              v-on:click="clear"
              class="text-gray-600 hover:text-gray-800 hover:bg-red-300 px-4 py-2 rounded focus:outline-none"
            >
              クリア
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
