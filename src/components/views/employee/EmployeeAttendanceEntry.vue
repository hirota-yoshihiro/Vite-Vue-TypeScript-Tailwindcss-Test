<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-4">勤怠入力画面</h2>

      <form v-on:submit.prevent="submitAttendanceData">
        <!-- 1: 入力日 -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >入力日:</label
          >
          <div class="flex justify-center items-center">
            <div class="mr-4">
              <Datepicker
                v-model="startingDate"
                :format="formatDate"
                locale="jp"
                auto-apply
              ></Datepicker>
            </div>

            <div>〜　</div>
            <div>
              <Datepicker
                v-model="finalDate"
                :format="formatDate"
                locale="jp"
                auto-apply
              ></Datepicker>
            </div>
          </div>
        </div>

        <!-- 3. プロジェクト区分 -->
        <div class="mb-4">
          <label
            for="project_category"
            class="block text-gray-700 text-sm font-bold mb-2"
            >プロジェクト区分:</label
          >
          <select
            v-model="projectCategory"
            id="project_category"
            name="project_category"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value="customer">お客様用</option>
            <option value="estimation">見積業務</option>
            <option value="research">研究開発</option>
            <option value="in-house">自社製品</option>
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
              v-model="projectId"
              id="project_id"
              name="project_id"
              class="w-3/12 px-3 py-2 border rounded focus:outline-none focus:border-blue-500 mr-4"
              readonly
            />

            <!-- 6. プロジェクト名 読み取り専用 -->
            <input
              v-model="projectName"
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
            v-model="projectTime"
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

        <div class="flex justify-between">
          <!-- 8. 残業 -->
          <div class="mb-4 w-3/12">
            <label
              for="project_category"
              class="block text-gray-700 text-sm font-bold mb-2"
              >残業:</label
            >
            <select
              v-model="overtime"
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
              v-model="lateNightOvertime"
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
              v-model="holidayWorkTime"
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
              v-model="projectCategory"
              id="project_category"
              name="project_category"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="salaried">有給</option>
              <option value="absenteeism">欠勤</option>
              <option value="publicHoliday">公休</option>
            </select>

            <select
              v-model="salariedAndAbsenteeismAndPublicHolidayTime"
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
              v-model="companyClosureTime"
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
            キャンセル
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

let startingDate = ref(new Date());
let finalDate = ref(new Date());
let projectCategory = ref("");
let projectId = ref<null | number>(null);
let projectName = ref("");
let projectTime = ref(0.0);
let overtime = ref(0.0);
let lateNightOvertime = ref(0.0);
let holidayWorkTime = ref(0.0);
let salariedAndAbsenteeismAndPublicHolidayTime = ref(0.0);
let companyClosureTime = ref(0.0);

// TODO 初期化値の0.0が、optionタグの初期値として設定されない。
const projectHours = generateSelectOptionsBy05increments(49);
const overtimeHours = generateSelectOptionsBy05increments(17);
const lateNightHours = generateSelectOptionsBy05increments(15);
const holidayWorkHours = generateSelectOptionsBy05increments(49);
const salariedAndAbsenteeismAndPublicHolidayHours =
  generateSelectOptionsBy05increments(3);
const companyClosureHours = generateSelectOptionsBy05increments(17);

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
}

function generateSelectOptionsBy05increments(length: number) {
  return Array.from({ length }, (_, index) => (index * 0.5).toFixed(1));
}

function submitAttendanceData() {
  // TODO プレビュー画面へ遷移する。
}

function clearForm() {
  startingDate.value = new Date();
  finalDate.value = new Date();
  projectCategory.value = "";
  projectId.value = null;
  projectName.value = "";
  projectTime.value = 0.0;
  overtime.value = 0.0;
  lateNightOvertime.value = 0.0;
  holidayWorkTime.value = 0.0;
  salariedAndAbsenteeismAndPublicHolidayTime.value = 0.0;
  companyClosureTime.value = 0.0;
}
</script>
