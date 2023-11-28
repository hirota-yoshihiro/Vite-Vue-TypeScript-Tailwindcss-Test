<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useStoreProjects } from "@/stores/projects";

const projectsObj = useStoreProjects();
const { projects } = storeToRefs(projectsObj);
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
