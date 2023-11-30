<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import Datepicker from "@vuepic/vue-datepicker";

import { useStoreAttendanceData } from "@/stores/attendanceData";
import "@vuepic/vue-datepicker/dist/main.css";

type AttendanceData = {
  projectCategory: string;
  startingDate: Date;
  finalDate: Date;
  overtime: number;
  lateNightOvertime: number;
  holidayWorkTime: number;
  salariedAndAbsenteeismAndPublicHolidayTime: number;
  companyClosureTime: number;
  projects: [
    {
      id: string;
      name: string;
      type: string;
      time: number;
    }
  ];
};

const { getAttendanceData } = useStoreAttendanceData();
const attendanceData: AttendanceData = reactive({
  projectCategory: ref(""),
  startingDate: ref(new Date()),
  finalDate: ref(new Date()),
  overtime: ref(0.0),
  lateNightOvertime: ref(0.0),
  holidayWorkTime: ref(0.0),
  salariedAndAbsenteeismAndPublicHolidayTime: ref(0.0),
  companyClosureTime: ref(0.0),
  projects: [
    {
      id: "",
      name: "",
      type: "",
      time: 0,
    },
  ],
});

// TODO 初期化値の0.0が、optionタグの初期値として設定されない。
const projectHours = generateSelectOptionsBy05increments(49);
const overtimeHours = generateSelectOptionsBy05increments(17);
const lateNightHours = generateSelectOptionsBy05increments(15);
const holidayWorkHours = generateSelectOptionsBy05increments(49);
const salariedAndAbsenteeismAndPublicHolidayHours =
  generateSelectOptionsBy05increments(3);
const companyClosureHours = generateSelectOptionsBy05increments(17);

insertProjectsFromCookie();
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

  attendanceData.projects = reactive(parseProjects);
  attendanceData.projects.forEach((project) => {
    project.time = 0;
  });
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
}

function generateSelectOptionsBy05increments(length: number) {
  return Array.from({ length }, (_, index) => (index * 0.5).toFixed(1));
}

const router = useRouter();
function transitionToPreview() {
  getAttendanceData(attendanceData);
  router.push("/employee/dashboard/attendance-entry/preview");
}

function clearForm() {
  attendanceData.startingDate = new Date();
  attendanceData.finalDate = new Date();
  attendanceData.overtime = 0.0;
  attendanceData.lateNightOvertime = 0.0;
  attendanceData.holidayWorkTime = 0.0;
  attendanceData.salariedAndAbsenteeismAndPublicHolidayTime = 0.0;
  attendanceData.companyClosureTime = 0.0;
}
</script>

<template>
  <div class="flex h-full items-center justify-center bg-gray-100">
    <form class="h-full" v-on:submit.prevent="transitionToPreview">
      <div class="flex flex-col items-center justify-around h-full">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 class="text-2xl font-semibold mb-4">勤怠入力</h2>
          <!-- 1: 入力日 -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >入力日:</label
            >
            <div class="flex justify-center items-center">
              <div class="mr-4">
                <Datepicker
                  v-model="attendanceData.startingDate"
                  :format="formatDate"
                  locale="jp"
                  auto-apply
                ></Datepicker>
              </div>

              <div>〜　</div>
              <div>
                <Datepicker
                  v-model="attendanceData.finalDate"
                  :format="formatDate"
                  locale="jp"
                  auto-apply
                ></Datepicker>
              </div>
            </div>
          </div>

          <div class="flex justify-between">
            <!-- 8. 残業 -->
            <div class="mb-4 w-3/12">
              <label
                for="project_category"
                class="block text-gray-700 text-sm font-bold mb-2"
                >残業:</label
              >
              <select
                v-model="attendanceData.overtime"
                id="project_category"
                name="project_category"
                class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option
                  v-for="hour in overtimeHours"
                  v-bind:key="hour"
                  v-bind:value="hour"
                >
                  {{ hour }}
                </option>
              </select>
            </div>

            <!-- 9. 深夜残業 -->
            <div class="mb-4 w-3/12">
              <label
                for="project_category"
                class="block text-gray-700 text-sm font-bold mb-2"
                >深夜残業:</label
              >
              <select
                v-model="attendanceData.lateNightOvertime"
                id="project_category"
                name="project_category"
                class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option
                  v-for="hour in lateNightHours"
                  v-bind:key="hour"
                  v-bind:value="hour"
                >
                  {{ hour }}
                </option>
              </select>
            </div>

            <!-- 10. 休日出勤 -->
            <div class="mb-4 w-3/12">
              <label
                for="project_category"
                class="block text-gray-700 text-sm font-bold mb-2"
                >休日出勤:</label
              >
              <select
                v-model="attendanceData.holidayWorkTime"
                id="project_category"
                name="project_category"
                class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option
                  v-for="hour in holidayWorkHours"
                  v-bind:key="hour"
                  v-bind:value="hour"
                >
                  {{ hour }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex justify-around">
            <!-- 11. 有給、欠勤、公休 -->
            <div class="mb-4 w-3/12">
              <select
                v-model="attendanceData.projectCategory"
                id="project_category"
                name="project_category"
                class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="salaried">有給</option>
                <option value="absenteeism">欠勤</option>
                <option value="publicHoliday">公休</option>
              </select>

              <select
                v-model="
                  attendanceData.salariedAndAbsenteeismAndPublicHolidayTime
                "
                id="project_category"
                name="project_category"
                class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option
                  v-for="hour in salariedAndAbsenteeismAndPublicHolidayHours"
                  v-bind:key="hour"
                  v-bind:value="hour"
                >
                  {{ hour }}
                </option>
              </select>
            </div>

            <!-- 12. 休業 -->
            <div class="mb-4 w-3/12">
              <label
                for="project_category"
                class="block text-gray-700 text-sm font-bold mb-2"
                >休業:</label
              >
              <select
                v-model="attendanceData.companyClosureTime"
                id="project_category"
                name="project_category"
                class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option
                  v-for="hour in companyClosureHours"
                  v-bind:key="hour"
                  v-bind:value="hour"
                >
                  {{ hour }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex">
          <div
            class="bg-white p-8 rounded shadow-md w-full max-w-md"
            v-for="project in attendanceData.projects"
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
            <div class="mb-4">
              <label
                for="project_category"
                class="block text-gray-700 text-sm font-bold mb-2"
                >プロジェクト時間:</label
              >
              <select
                v-model="project.time"
                id="project_category"
                name="project_category"
                class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option
                  v-for="hour in projectHours"
                  v-bind:key="hour"
                  v-bind:value="hour"
                >
                  {{ hour }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
          >
            プレビュー
          </button>
          <button
            type="button"
            v-on:click="clearForm"
            class="text-gray-600 hover:text-gray-800 hover:bg-red-300 px-4 py-2 rounded focus:outline-none"
          >
            クリア
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
