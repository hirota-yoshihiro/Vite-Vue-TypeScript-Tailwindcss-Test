<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import Cookies from "js-cookie";

import "@vuepic/vue-datepicker/dist/main.css";

import { useStoreAttendance } from "@/stores/attendance";

const storeAttendance = useStoreAttendance();
const { attendance } = storeToRefs(storeAttendance);

onMounted(() => {
  init();
});

function init() {
  insertProjectsFromCookie();
}

function insertProjectsFromCookie() {
  const _PROJECTS = "_projects";
  let _projects: undefined | string = Cookies.get(_PROJECTS);

  if (!_projects) _projects = "[]";

  let parseProjects = JSON.parse(_projects!);
  if (parseProjects.length === 0)
    parseProjects = [
      {
        id: "",
        name: "",
        type: "",
      },
    ];

  console.log(parseProjects);

  attendance.value.projects = parseProjects;
  attendance.value.projects.forEach((project) => {
    project.time = 0;
  });
}
</script>

<template>
  <div class="flex">
    <div
      class="bg-white p-8 rounded shadow-md w-full max-w-md"
      v-for="project in attendance.projects"
    >
      <!-- プロジェクトリスト 案件一覧でチェックを入れたプロジェクトをループで回して表示させる。 -->

      <!-- 3. プロジェクト区分 -->
      <div class="mb-4">
        <label
          for="project_category"
          class="block text-gray-700 text-sm font-bold mb-2"
          >プロジェクト区分:</label
        >
        <select
          id="project_category"
          name="project_category"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
        >
          <option
            value="estimation"
            v-bind:selected="project.type === 'estimation'"
            v-bind:disabled="project.type !== 'estimation'"
          >
            見積業務
          </option>

          <option
            value="customer"
            v-bind:selected="project.type === 'customer'"
            v-bind:disabled="project.type !== 'customer'"
          >
            お客様用
          </option>
          <option
            value="development"
            v-bind:selected="project.type === 'development'"
            v-bind:disabled="project.type !== 'development'"
          >
            研究開発
          </option>
          <option
            value="inProducts"
            v-bind:selected="project.type === 'inProducts'"
            v-bind:disabled="project.type !== 'inProducts'"
          >
            自社製品
          </option>
        </select>
      </div>

      <!-- 4. プロジェクト詳細 -->
      <div class="mb-4">
        <label
          for="project_id"
          class="block text-gray-700 text-sm font-bold mb-2"
          >プロジェクト詳細:</label
        >

        <div class="flex items-center">
          <!-- 5. プロジェクトID 読み取り専用 -->
          <input
            v-bind:value="project.id"
            id="project_id"
            name="project_id"
            class="w-3/12 px-3 py-2 border rounded focus:outline-none focus:border-blue-500 mr-4"
            readonly
          />

          <!-- 6. プロジェクト名 読み取り専用 -->
          <input
            v-bind:value="project.name"
            type="text"
            id="project_name"
            name="project_name"
            class="w-9/12 px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            readonly
          />
        </div>
      </div>

      <!-- 7. プロジェクト時間 -->
      <div class="mb-4"></div>
    </div>
  </div>
</template>
