<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios";

import { ChevronDownIcon } from "@heroicons/vue/24/outline";

import { config } from "../config/application.config";

const fetchProjects = async (projectType: string) => {
  const LIST_OF_PROJECTS_ENDPOINT = config.LIST_OF_PROJECTS_ENDPOINT;
  let response;
  try {
    response = await axios.get(
      `${LIST_OF_PROJECTS_ENDPOINT}?type=${projectType}`
    );
  } catch (err: any) {
    const statusCode = err.response.status;

    if (statusCode >= 500) {
      window.alert(err.response.data);
      return;
    }
  }

  console.log(response);
};

const lists = reactive([
  {
    name: "案件一覧",
    show: false,
    sublists: [
      {
        name: "見積もり業務",
        click: () => fetchProjects("customer"),
      },
      {
        name: "お客様用",
        click: () => fetchProjects("estimation"),
      },
      {
        name: "研究開発用",
        click: () => fetchProjects("development"),
      },
      {
        name: "自社製品用",
        click: () => fetchProjects("inProducts"),
      },
    ],
  },
  {
    name: "勤怠管理",
  },
]);

const toggle = (name: string) => {
  const list = lists.find((list) => list.name === name);
  list!.show = !list!.show;
};
</script>

<template>
  <ul class="text-gray-700">
    <li class="ml-8 mb-1 cursor-pointer" v-for="list in lists" :key="list.name">
      <a
        v-if="!list.sublists"
        class="flex items-center p-2 rounded-sm hover:text-white hover:bg-blue-400"
      >
        <span>{{ list.name }}</span>
      </a>
      <div
        v-else
        class="flex items-center justify-between p-2 cursor-pointer rounded-sm hover:bg-blue-400 hover:text-white"
        v-on:click="toggle(list.name)"
      >
        <div class="flex">
          <span>{{ list.name }}</span>
        </div>
        <ChevronDownIcon
          class="w-4 h-4 transform duration-300"
          v-bind:class="!list.show ? 'rotate-0' : '-rotate-180'"
        />
      </div>
      <ul class="mt-1" v-show="list.show">
        <li
          class="mb-1"
          v-for="subList in list.sublists"
          :key="list.name"
          v-on:click="subList.click"
        >
          <a class="block p-2 rounded-sm hover:bg-blue-400 hover:text-white">
            <span class="pl-8">{{ subList.name }}</span>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>
