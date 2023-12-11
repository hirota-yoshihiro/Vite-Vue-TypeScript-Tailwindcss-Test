<script setup lang="ts">
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";
import Datepicker from "@vuepic/vue-datepicker";

import { config } from "@/config/application.config";
import { useStoreEmployee } from "@/stores/employee";

import "@vuepic/vue-datepicker/dist/main.css";

type AttendanceData = {
  absenteeismTime: number;
  annualVacationTime: number;
  finalDate: Date;
  holidayWorkTime: number;
  lateNightOverTime: number;
  overTime: number;
  publicHolidayTime: number;
  startingDate: Date;
  projects: [
    {
      id: string;
      name: string;
      type: any;
      time: number;
    }
  ];
};

const storeEmployee = useStoreEmployee();
const { employee } = storeToRefs(storeEmployee);

const attendanceData: AttendanceData = reactive({
  absenteeismTime: ref(0.0),
  annualVacationTime: ref(0.0),
  finalDate: ref(new Date()),
  holidayWorkTime: ref(0.0),
  lateNightOverTime: ref(0.0),
  overTime: ref(0.0),
  publicHolidayTime: ref(0.0),
  startingDate: ref(new Date()),
  projects: [
    {
      id: "",
      name: "",
      type: "",
      time: 0,
    },
  ],
});
const projectHours = ref([""]);
const overtimeHours = ref([""]);
const lateNightHours = ref([""]);
const holidayWorkHours = ref([""]);
const annualVacationAndAbsenteeismAndPublicHolidayHours = ref([""]);

selectInit();
function selectInit() {
  // TODO 初期化値の0.0が、optionタグの初期値として設定されない。
  projectHours.value = generateSelectOptionsBy05increments(49);
  overtimeHours.value = generateSelectOptionsBy05increments(17);
  lateNightHours.value = generateSelectOptionsBy05increments(15);
  holidayWorkHours.value = generateSelectOptionsBy05increments(49);
  annualVacationAndAbsenteeismAndPublicHolidayHours.value =
    generateSelectOptionsBy05increments(3);
}

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

function selectProjectType(
  type: "estimation" | "development" | "inProducts" | "customer"
) {
  const projectList = {
    estimation: "見積もり業務",
    development: "研究開発",
    inProducts: "自社製品",
    customer: "お客様用",
  };

  return projectList[type];
}

function generateSelectOptionsBy05increments(length: number) {
  return Array.from({ length }, (_, index) => (index * 0.5).toFixed(1));
}

const isAttendancePage = ref(true);
function moveToPreview() {
  // attendanceDataのバリデーションチェック
  validateAttendanceData(attendanceData);
  isAttendancePage.value = false;
}

function validateAttendanceData(data: AttendanceData) {}

function backToAttendancePage() {
  isAttendancePage.value = true;
}

async function submitAttendanceData() {
  // バックエンド側へattendanceDataを送信
  if (!window.confirm("勤怠入力をサーバーへ送信しても宜しいですか？")) return;

  const submitdata = {
    attendanceEntry: {
      absenteeismTime: attendanceData.absenteeismTime,
      annualVacationTime: attendanceData.annualVacationTime,
      finalDate: attendanceData.finalDate,
      holidayWorkTime: attendanceData.holidayWorkTime,
      lateNightOverTime: attendanceData.lateNightOverTime,
      overTime: attendanceData.overTime,
      publicHolidayTime: attendanceData.publicHolidayTime,
      startingDate: attendanceData.startingDate,
    },
    projects: attendanceData.projects,
    employeeId: employee.value.id,
  };
  let response;
  try {
    response = await axios.post(
      `${config.BACKEND_URL}/api/attendance`,
      submitdata
    );
  } catch (e) {}
}

function clearForm() {
  attendanceData.startingDate = new Date();
  attendanceData.finalDate = new Date();
  attendanceData.overTime = 0.0;
  attendanceData.lateNightOverTime = 0.0;
  attendanceData.holidayWorkTime = 0.0;
  attendanceData.annualVacationTime = 0.0;
  attendanceData.absenteeismTime = 0.0;
  attendanceData.publicHolidayTime = 0.0;
}
</script>

<template>
  <div class="h-full">
    <transition name="fade" mode="out-in">
      <template v-if="isAttendancePage">
        <div class="flex h-full items-center justify-center bg-gray-100">
          <form class="h-full" v-on:submit.prevent="moveToPreview">
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

                <div>
                  <div class="flex justify-between">
                    <!-- 8. 残業 -->
                    <div class="mb-4 w-3/12">
                      <label
                        for="project_category"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >残業:</label
                      >
                      <select
                        v-model="attendanceData.overTime"
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
                        v-model="attendanceData.lateNightOverTime"
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
                          v-for="hour in annualVacationAndAbsenteeismAndPublicHolidayHours"
                          v-bind:key="hour"
                          v-bind:value="hour"
                        >
                          {{ hour }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="flex justify-between">
                    <!-- 11. 年休 -->
                    <div class="mb-4 w-3/12">
                      <label
                        for="project_category"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >年休:</label
                      >
                      <select
                        v-model="attendanceData.annualVacationTime"
                        id="project_category"
                        name="project_category"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                      >
                        <option
                          v-for="hour in annualVacationAndAbsenteeismAndPublicHolidayHours"
                          v-bind:key="hour"
                          v-bind:value="hour"
                        >
                          {{ hour }}
                        </option>
                      </select>
                    </div>

                    <!-- 12. 欠勤 -->
                    <div class="mb-4 w-3/12">
                      <label
                        for="project_category"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >欠勤:</label
                      >
                      <select
                        v-model="attendanceData.absenteeismTime"
                        id="project_category"
                        name="project_category"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                      >
                        <option
                          v-for="hour in annualVacationAndAbsenteeismAndPublicHolidayHours"
                          v-bind:key="hour"
                          v-bind:value="hour"
                        >
                          {{ hour }}
                        </option>
                      </select>
                    </div>

                    <!-- 13. 公休 -->
                    <div class="mb-4 w-3/12">
                      <label
                        for="project_category"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >公休:</label
                      >
                      <select
                        v-model="attendanceData.publicHolidayTime"
                        id="project_category"
                        name="project_category"
                        class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                      >
                        <option
                          v-for="hour in annualVacationAndAbsenteeismAndPublicHolidayHours"
                          v-bind:key="hour"
                          v-bind:value="hour"
                        >
                          {{ hour }}
                        </option>
                      </select>
                    </div>
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
              <div class="flex justify-center items-center w-full">
                <button
                  type="submit"
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none mr-8"
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
      <template v-else>
        <div class="flex h-full items-center justify-center bg-gray-400">
          <form class="h-full" v-on:submit.prevent="submitAttendanceData">
            <div class="flex flex-col items-center justify-around h-full">
              <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 class="text-2xl font-semibold mb-4">勤怠入力</h2>

                <!-- 1: 入力日  -->
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2"
                    >入力日:</label
                  >
                  <div class="flex justify-start items-center">
                    <div>
                      <span readonly>{{
                        formatDate(attendanceData.startingDate)
                      }}</span>
                    </div>

                    <div>&nbsp;〜&nbsp;</div>
                    <div>
                      <span readonly>{{
                        formatDate(attendanceData.finalDate)
                      }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between">
                    <!-- 8. 残業 -->
                    <div class="mb-4 w-3/12">
                      <label
                        for="project_category"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >残業:</label
                      >
                      <span readonly>{{ attendanceData.overTime }}</span>
                    </div>

                    <!-- 9. 深夜残業 -->
                    <div class="mb-4 w-3/12">
                      <label
                        for="project_category"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >深夜残業:</label
                      >
                      <span readonly>{{
                        attendanceData.lateNightOverTime
                      }}</span>
                    </div>

                    <!-- 10. 休日出勤 -->
                    <div class="mb-4 w-3/12">
                      <label
                        for="project_category"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >休日出勤:</label
                      >
                      <span readonly>{{ attendanceData.holidayWorkTime }}</span>
                    </div>
                  </div>

                  <div class="flex justify-between">
                    <!-- 11. 年休 -->
                    <div class="mb-4 w-3/12">
                      <label
                        for="project_category"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >年休:</label
                      >
                      <span readonly>{{
                        attendanceData.annualVacationTime
                      }}</span>
                    </div>

                    <!-- 12. 欠勤 -->
                    <div class="mb-4 w-3/12">
                      <label
                        for="project_category"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >欠勤:</label
                      >
                      <span readonly>{{ attendanceData.absenteeismTime }}</span>
                    </div>

                    <!-- 13. 公休 -->
                    <div class="mb-4 w-3/12">
                      <label
                        for="project_category"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >公休:</label
                      >
                      <span readonly>{{
                        attendanceData.publicHolidayTime
                      }}</span>
                    </div>
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
                    <input
                      type="text"
                      v-bind:value="selectProjectType(project.type)"
                      readonly
                    />
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
                    <input type="text" v-bind:value="project.time" readonly />
                  </div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <button
                  type="submit"
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none mr-8"
                >
                  送信
                </button>
                <button
                  v-on:click="backToAttendancePage"
                  type="button"
                  class="text-gray-600 hover:text-gray-800 hover:bg-red-300 px-4 py-2 rounded focus:outline-none"
                >
                  戻る
                </button>
              </div>
            </div>
          </form>
        </div>
      </template>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
