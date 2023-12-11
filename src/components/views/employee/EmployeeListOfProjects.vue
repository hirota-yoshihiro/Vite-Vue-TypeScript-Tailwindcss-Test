<script setup lang="ts">
import { storeToRefs } from "pinia";
import Cookies from "js-cookie";

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

const _PROJECTS = "_projects";
const setCookie = (project: Project) => {
  // 1. 現在のcookieに保存されている_projectsの値を取得する。

  let _projectsInCookie: any = Cookies.get(_PROJECTS);
  if (!_projectsInCookie) _projectsInCookie = JSON.stringify([]);
  const parseProjects: Project[] = JSON.parse(_projectsInCookie!);

  // 2. もしcookieに_projectsという値が保存されていない場合は_projectsというキーと、引数に渡ってくるproject(オブジェクト)の値を配列の要素の初期値として設定する。
  // 3. cookieから_projectsの値が取得できた場合、現在格納されている配列に引数に渡ってくるprojectをpushする。
  const existParseProject = parseProjects.length === 0;
  if (existParseProject) {
    const initValue = JSON.stringify([project]);
    Cookies.set(_PROJECTS, initValue);
  } else {
    // 4. deleteCookieの関数を通らずにチェックボックスが押された場合は値が重複するので、削除するロジックを追加する。
    const isExist =
      parseProjects.findIndex((element) => element.id === project.id) !== -1;
    if (isExist) {
      deleteCookie(project);
      return;
    }
    // 4の実装ここまで

    parseProjects.push(project);
    Cookies.set(_PROJECTS, JSON.stringify(parseProjects));
  }
};

const deleteCookie = (project: Project) => {
  // 1. 現在のcookieに保存されている_projectsの値を取得する。

  debugger;
  const _projectsInCookie = Cookies.get(_PROJECTS);
  const parseProjects: Project[] = JSON.parse(_projectsInCookie!);

  // 2. cookieに保存されている_projectsの配列からIDが一致するオブジェクトを検索して、ヒットした場合にそのオブジェクトのindexがわかるので、その配列から当該オブジェクトを削除する。

  const index = parseProjects.findIndex((element) => element.id === project.id);
  parseProjects.splice(index, 1);
  Cookies.set(_PROJECTS, JSON.stringify(parseProjects));
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
