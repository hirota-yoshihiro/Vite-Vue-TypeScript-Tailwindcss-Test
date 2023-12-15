<script setup lang="ts">
import axios from "axios";
import { storeToRefs } from "pinia";
import { useStoreEmployee } from "@/stores/employee";

import { config } from "@/config/application.config";
import "@vuepic/vue-datepicker/dist/main.css";

const storeEmployee = useStoreEmployee();
const { employee } = storeToRefs(storeEmployee);

function backToAttendancePage() {
  isAttendancePage.value = true;
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

async function submitAttendanceData() {
  // バックエンド側へreactiveDataを送信
  if (!window.confirm("勤怠入力をサーバーへ送信しても宜しいですか？")) return;

  const submitdata = {
    attendanceEntry: {
      absenteeismTime: reactiveAttendanceData.absenteeismTime,
      annualVacationTime: reactiveAttendanceData.annualVacationTime,
      finalDate: reactiveAttendanceData.finalDate,
      holidayWorkTime: reactiveAttendanceData.holidayWorkTime,
      lateNightOverTime: reactiveAttendanceData.lateNightOverTime,
      overTime: reactiveAttendanceData.overTime,
      publicHolidayTime: reactiveAttendanceData.publicHolidayTime,
      startingDate: reactiveAttendanceData.startingDate,
    },
    projects: reactiveAttendanceData.projects,
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
</script>
<template>Preview</template>
