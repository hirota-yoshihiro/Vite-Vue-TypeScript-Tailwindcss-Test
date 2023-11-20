<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-4">勤怠入力画面</h2>

      <!-- 1. 入力日（開始日） -->
      <div class="mb-4">
        <label
          for="start_date"
          class="block text-gray-700 text-sm font-bold mb-2"
          >入力日（開始日）:</label
        >
        <!-- <input
          v-model="startDate"
          type="text"
          id="start_date"
          name="start_date"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          @click="showCalendar('startDate')"
        /> -->
        <!-- カレンダーの表示処理は省略 -->

        <!-- 仮のカレンダー -->
        <div v-if="showCalendarFlag">
          <input
            type="date"
            v-model="selectedDate"
            @input="onDateSelect"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <!-- 2. 入力日（終了日） -->
      <div class="mb-4">
        <label for="end_date" class="block text-gray-700 text-sm font-bold mb-2"
          >入力日（終了日）:</label
        >
        <input
          v-model="endDate"
          type="text"
          id="end_date"
          name="end_date"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          @click="showCalendar('endDate')"
        />
        <!-- カレンダーの表示処理は省略 -->

        <!-- 仮のカレンダー -->
        <div v-if="showCalendarFlag">
          <input
            type="date"
            v-model="selectedDate"
            @input="onDateSelect"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const startDate = ref("");
const endDate = ref("");
const showCalendarFlag = ref(false);
const selectedDate = ref("");

const showCalendar = (dateType: any) => {
  showCalendarFlag.value = true;
};

const onDateSelect = () => {
  showCalendarFlag.value = false;
};

// ... (省略)
</script>
