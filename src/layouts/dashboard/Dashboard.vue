<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import axios from "axios";

import { ChevronDownIcon } from "@heroicons/vue/24/outline";

import { config } from "@/config/application.config";
import { useStoreProjects } from "@/stores/projects";
import { useStoreEmployee } from "@/stores/employee";

const router = useRouter();
const storeProjects = useStoreProjects();
const { getProjects } = storeProjects;
const storeEmployee = useStoreEmployee();
const { employee } = storeToRefs(storeEmployee);

const showSide = ref(true);
const showDropDown = ref(false);
const lists = reactive([
  {
    name: "案件一覧",
    show: false,
    sublists: [
      {
        name: "見積もり業務",
        type: "estimation",
      },
      {
        name: "お客様用",
        type: "customer",
      },
      {
        name: "研究開発用",
        type: "development",
      },
      {
        name: "自社製品用",
        type: "inProducts",
      },
    ],
  },
  {
    name: "勤怠管理",
    to: "/employee/dashboard/attendance-entry",
  },
]);

const toggleProfileMenu = () => {
  showDropDown.value = !showDropDown.value;
};

const toggleSideBar = () => {
  showSide.value = !showSide.value;
};

const toggleSideMenu = (name: string) => {
  const list = lists.find((list) => list.name === name);
  list!.show = !list!.show;
};

const fetchProjects = async (projectType: string) => {
  const URL = "/employee/dashboard/list-of-projects";
  router.push(`${URL}?type=${projectType}`);

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

  getProjects(response?.data);
};

const logout = async () => {
  const EMPLOYEE_LOGOUT_ENDPOINT = config.EMPLOYEE_LOGOUT_ENDPOINT;

  try {
    await axios.post(
      EMPLOYEE_LOGOUT_ENDPOINT,
      {},
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
  }

  router.push("/employee/login");
};
</script>

<template>
  <div class="w-screen h-screen flex">
    <!-- Side bar -->
    <div class="w-[400px] h-full bg-gray-200 text-white" v-show="showSide">
      <div class="h-[50px] bg-gray-900 flex justify-start items-center">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl">ダッシュボード</h3>
        </div>
      </div>

      <!-- Side Menu -->
      <ul class="text-gray-700">
        <li
          class="ml-8 mb-1 cursor-pointer"
          v-for="list in lists"
          :key="list.name"
        >
          <router-link
            v-bind:to="list.to"
            v-if="!list.sublists"
            class="flex items-center p-2 rounded-sm hover:text-white hover:bg-blue-400"
          >
            <span>{{ list.name }}</span>
          </router-link>
          <div
            v-else
            class="flex items-center justify-between p-2 cursor-pointer rounded-sm hover:bg-blue-400 hover:text-white"
            v-on:click="toggleSideMenu(list.name)"
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
            <li class="mb-1" v-for="subList in list.sublists" :key="list.name">
              <p
                v-on:click="fetchProjects(subList.type)"
                class="block p-2 rounded-sm hover:bg-blue-400 hover:text-white"
              >
                <span class="pl-8">{{ subList.name }}</span>
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- Header -->
    <div class="w-full h-full bg-gray-100">
      <div
        class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b"
      >
        <!-- Hambuger menu -->
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="w-[25px] h-[25px]"
          >
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </div>
        <!-- Search bar -->

        <div class="w-[calc(100%-30px)] flex z-0">
          <div class="w-[calc(100%-200px)] flex justify-center">
            <!-- Search bar -->
            <form class="flex items-center w-[500px]">
              <label for="voice-search" class="sr-only">検索</label>
              <div class="relative w-full">
                <div
                  class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-auto text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="voice-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="検索..."
                  required
                />
                <router-link
                  to="/"
                  class="flex absolute inset-y-0 right-0 items-center pr-3"
                >
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </router-link>
              </div>
            </form>
          </div>

          <!-- User login -->
          <div class="w-[200px] relative z-0">
            <div
              class="flex items-center justify-start space-x-4"
              v-on:click="toggleProfileMenu"
            >
              <img
                class="w-10 h-10 rounded-full border-2 border-gray-50"
                src="https://yt3.ggpht.com/hqsxh-Vnbw9OK0_X4DAWh6RkmEUVnL-82SRCyh-IKr9fIXR8zhUCRdBEwgWWL_14q_L8Piod=s108-c-k-c0x00ffffff-no-rj"
                alt=""
              />
              <div class="font-semibold dark:text-white text-left">
                <div>{{ employee.name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  従業員
                </div>
              </div>
            </div>

            <!-- Drop down -->
            <div
              v-show="showDropDown"
              class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1 text-left" role="none">
                <button
                  v-on:click="logout"
                  class="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-3"
                >
                  ログアウト
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
        <div class="border border-gray-300 rounded-md p-[20px] h-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- Main  -->
  </div>
</template>
