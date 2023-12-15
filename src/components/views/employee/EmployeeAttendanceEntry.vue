<script setup lang="ts">
import { storeToRefs } from "pinia";
import Datepicker from "@vuepic/vue-datepicker";

import "@vuepic/vue-datepicker/dist/main.css";

import { useStoreAttendance } from "@/stores/attendance";

const storeAttendance = useStoreAttendance();
const { attendance } = storeToRefs(storeAttendance);
const {
  getAbsenteeismTime,
  getAnnualVacationTime,
  getCompanyClosureTime,
  getHolidayWorkTime,
  getLateNightOverTime,
  getOverTime,
  getPublicHolidayTime,
} = storeAttendance;

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
}
</script>

<template>
  <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h2 class="text-2xl font-semibold mb-4">勤怠入力</h2>
    <!-- 1: 入力日 -->
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">入力日:</label>
      <div class="flex justify-center items-center">
        <div class="mr-4">
          <!-- TODO 恐らくデータ更新はされないので要確認 -->
          <Datepicker
            v-model="attendance.startingDate"
            :format="formatDate"
            locale="jp"
            auto-apply
          ></Datepicker>
        </div>

        <div>〜　</div>
        <div>
          <!-- TODO 恐らくデータ更新はされないので要確認 -->
          <Datepicker
            v-model="attendance.finalDate"
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
            for="over_time"
            class="block text-gray-700 text-sm font-bold mb-2"
            >残業:</label
          >
          <input
            v-bind:value="attendance.overTime"
            v-on:input="(event: any) => getOverTime(event.target.value)"
            id="over_time"
            name="over_time"
            type="text"
            class="w-full p-1 text-center text-gray-500 outline rounded-sm"
          />
        </div>

        <!-- 9. 深夜残業 -->
        <div class="mb-4 w-3/12">
          <label
            for="late_night_over_time"
            class="block text-gray-700 text-sm font-bold mb-2"
            >深夜残業:</label
          >
          <input
            v-bind:value="attendance.lateNightOverTime"
            v-on:input="(event: any) => getLateNightOverTime(event.target.value)"
            id="late_night_over_time"
            name="late_night_over_time"
            type="text"
            class="w-full p-1 text-center text-gray-500 outline rounded-sm"
          />
        </div>

        <!-- 10. 休日出勤 -->
        <div class="mb-4 w-3/12">
          <label
            for="holiday_workTime"
            class="block text-gray-700 text-sm font-bold mb-2"
            >休日出勤:</label
          >
          <input
            v-bind:value="attendance.holidayWorkTime"
            v-on:input="(event: any) => getHolidayWorkTime(event.target.value)"
            id="holiday_workTime"
            name="holiday_workTime"
            type="text"
            class="w-full p-1 text-center text-gray-500 outline rounded-sm"
          />
        </div>
      </div>

      <div class="flex justify-between">
        <!-- 11. 年休 -->
        <div class="mb-4 w-3/12">
          <label
            for="annual_vacationTime"
            class="block text-gray-700 text-sm font-bold mb-2"
            >年休:</label
          >
          <input
            v-bind:value="attendance.annualVacationTime"
            v-on:input="(event: any) => getAnnualVacationTime(event.target.value)"
            id="annual_vacationTime"
            name="annual_vacationTime"
            type="text"
            class="w-full p-1 text-center text-gray-500 outline rounded-sm"
          />
        </div>

        <!-- 12. 欠勤 -->
        <div class="mb-4 w-3/12">
          <label
            for="absenteeism_time"
            class="block text-gray-700 text-sm font-bold mb-2"
            >欠勤:</label
          >
          <input
            v-bind:value="attendance.absenteeismTime"
            v-on:input="(event: any) => getAbsenteeismTime(event.target.value)"
            id="absenteeism_time"
            name="absenteeism_time"
            type="text"
            class="w-full p-1 text-center text-gray-500 outline rounded-sm"
          />
        </div>

        <!-- 13. 公休 -->
        <div class="mb-4 w-3/12">
          <label
            for="public_holiday_time"
            class="block text-gray-700 text-sm font-bold mb-2"
            >公休:</label
          >
          <input
            v-bind:value="attendance.publicHolidayTime"
            v-on:input="(event: any) => getPublicHolidayTime(event.target.value)"
            id="public_holiday_time"
            name="public_holiday_time"
            type="text"
            class="w-full p-1 text-center text-gray-500 outline rounded-sm"
          />
        </div>
      </div>

      <!-- 14. 休業 -->
      <div class="mb-4 w-3/12">
        <label
          for="business_holiday"
          class="block text-gray-700 text-sm font-bold mb-2"
          >休業:</label
        >
        <input
          v-bind:value="attendance.companyClosureTime"
          v-on:input="(event: any) => getCompanyClosureTime(event.target.value)"
          id="business_holiday"
          name="business_holiday"
          type="text"
          class="w-full p-1 text-center text-gray-500 outline rounded-sm"
        />
      </div>
    </div>
  </div>
</template>
