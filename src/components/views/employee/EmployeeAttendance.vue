<script setup lang="ts">
import { storeToRefs } from "pinia";

import EmployeeAttendanceEntry from "./EmployeeAttendanceEntry.vue";
import EmployeeAttendanceProjects from "./EmployeeAttendanceProjects.vue";
import PreviewAndCancel from "./PreviewAndCancel.vue";
import EmployeeAttendancePreview from "@/components/views/employee/EmployeeAttendancePreview.vue";

import { useStoreAttendance } from "@/stores/attendance";

const storeAttendance = useStoreAttendance();
const { attendance } = storeToRefs(storeAttendance);
</script>

<template>
  <div class="h-full">
    <transition name="fade" mode="out-in">
      <template v-if="attendance.isDisplayAttendancePage">
        <div>
          <div class="flex h-full items-center justify-center bg-gray-100">
            <div class="flex flex-col items-center justify-around h-full">
              <!-- 勤怠入力画面 -->
              <EmployeeAttendanceEntry />

              <!-- プロジェクト入力画面 -->
              <EmployeeAttendanceProjects />
            </div>
          </div>
          <!-- プレビュー画面へ遷移、クリアボタン -->
          <PreviewAndCancel />
        </div>
      </template>

      <!-- プレビュー画面 -->
      <template v-else><EmployeeAttendancePreview /></template>
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
