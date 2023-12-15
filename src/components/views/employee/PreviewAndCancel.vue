<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useStoreAttendance } from "@/stores/attendance";

const storeAttendance = useStoreAttendance();
const { attendance } = storeToRefs(storeAttendance);

function moveToPreview() {
  validateAttendanceData(attendance);

  attendance.value.isDisplayAttendancePage = false;
}

// TODO attendanceDataのバリデーションチェック
function validateAttendanceData(data: any) {}

function clearForm() {
  storeAttendance.$reset();
}
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <button
      v-on:click="moveToPreview"
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
</template>
