<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useStoreProjects } from "@/stores/projects";

const projectsObj = useStoreProjects();
const { projects } = storeToRefs(projectsObj);

type Project = {
  id: string;
  name: string;
  type: string;
};

// TODO isCheckedがtrueの時はprojectをcookieに保存し、falseの時はcookieに保存したprojectをcookieから削除する。
const checkOperationOfCookie = (event: Event, project: Project) => {
  if (!(event.target instanceof HTMLInputElement)) return;

  const isCheckd = event.target.checked;
  if (isCheckd) {
    // cookieに保存
    setCookie(project);
  } else {
    // cookieから削除
    deleteCookie(project);
  }
};

const PROJECT_NAME_LIST = {
  estimation: "_estimationList",
  customer: "_customerList",
  development: "_developmentList",
  inProducts: "_inProductsList",
};

type ProjectType = "estimation" | "customer" | "development" | "inProducts";

const setCookie = (project: Project) => {
  let cookies: string = "";
  let period: number = 0;
  let expire: Date;

  // cookiesに格納されている同様のprojectのオブジェクトが存在しないか確認を行う。
  const projectType: ProjectType = project.type as ProjectType;
  const cookieName = PROJECT_NAME_LIST[`${projectType}`];

  // cookieにそれぞれのPROJECT_NAME_LISTに対応した値が一つでも保存されていればtrue、なければfalseの条件分岐を行う。
  // if ()
  // cookies = `${cookieName}=${JSON.stringify(project)};`;
  cookies = `${cookieName}=${JSON.stringify(project)};`;

  period = 5; // 保存日数 5日
  expire = new Date();
  expire.setTime(expire.getTime() + 1000 * 60 * 60 * 24 * period);
  expire.toUTCString();
  cookies += `expires=${expire};`;

  debugger;
  document.cookie += cookies;
};

const deleteCookie = (project: Project) => {
  let cookies = "";
  let cookieArray = new Array();
  let result = new Array();

  debugger;
  cookies = document.cookie;

  if (cookies) {
    cookieArray = cookies.split(";");

    cookieArray.forEach((data) => {
      data = data.split("=");
      result[data[0]] = JSON.parse(data[1]);
      console.log(result);
    });
  }
};
</script>

<template>
  <div>
    <!-- Project Name -->
    <!-- <h3 class="text-2xl font-bold text-left py-2">案件一覧</h3> -->
    <div class="overflow-x-auto relative sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <!-- Data Definition Column　-->
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-2">チェック</th>
            <th scope="col" class="py-3 px-6">管理番号</th>
            <th scope="col" class="py-3 px-6">案件名</th>
          </tr>
        </thead>

        <!-- Data Body -->
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="project in projects"
            v-bind:key="project.id"
          >
            <td class="py-4 px-6">
              <input
                type="checkbox"
                v-on:change="(event) => checkOperationOfCookie(event, project)"
              />
            </td>

            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ project.id }}
            </th>
            <td class="py-4 px-6">{{ project.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
