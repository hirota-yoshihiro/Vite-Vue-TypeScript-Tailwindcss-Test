<template>
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

  <!-- 4. プロジェクトID -->
  <div class="mb-4">
    <label for="project_id" class="block text-gray-700 text-sm font-bold mb-2"
      >プロジェクトID:</label
    >
    <select
      v-model="projectId"
      id="project_id"
      name="project_id"
      class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    >
      <!-- プロジェクトリストの表示処理は省略 -->
    </select>
  </div>

  <!-- 5. プロジェクト名 -->
  <div class="mb-4">
    <label for="project_name" class="block text-gray-700 text-sm font-bold mb-2"
      >プロジェクト名:</label
    >
    <input
      v-model="projectName"
      type="text"
      id="project_name"
      name="project_name"
      class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
      readonly
    />
  </div>

  <!-- 6. プロジェクト時間 -->
  <div class="mb-4">
    <label for="project_time" class="block text-gray-700 text-sm font-bold mb-2"
      >プロジェクト時間:</label
    >
    <input
      v-model="projectTime"
      type="number"
      step="0.5"
      id="project_time"
      name="project_time"
      class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  </div>

  <!-- 7. 「+」ボタン -->
  <div class="mb-4">
    <button
      type="button"
      @click="addProject"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none"
    >
      +
    </button>
  </div>

  <!-- 8. 残業 -->
  <div class="mb-4">
    <label for="overtime" class="block text-gray-700 text-sm font-bold mb-2"
      >残業:</label
    >
    <input
      v-model="overtime"
      type="number"
      step="0.5"
      id="overtime"
      name="overtime"
      class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  </div>

  <!-- 9. 深夜 -->
  <div class="mb-4">
    <label for="midnight" class="block text-gray-700 text-sm font-bold mb-2"
      >深夜:</label
    >
    <input
      v-model="midnight"
      type="number"
      step="0.5"
      id="midnight"
      name="midnight"
      class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  </div>

  <!-- 10. 休日出勤 -->
  <div class="mb-4">
    <label for="holiday_work" class="block text-gray-700 text-sm font-bold mb-2"
      >休日出勤:</label
    >
    <input
      v-model="holidayWork"
      type="number"
      step="0.5"
      id="holiday_work"
      name="holiday_work"
      class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  </div>

  <!-- 11. 有給休暇・欠勤・公休・休業 -->
  <div class="mb-4">
    <label for="leave_type" class="block text-gray-700 text-sm font-bold mb-2"
      >有給休暇・欠勤・公休・休業:</label
    >
    <select
      v-model="leaveType"
      id="leave_type"
      name="leave_type"
      class="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    >
      <option value="paid">有給休暇</option>
      <option value="absence">欠勤</option>
      <option value="public_holiday">公休</option>
      <option value="closure">休業</option>
    </select>
  </div>

  <!-- 12. OK・キャンセルボタン -->
  <div class="flex justify-between items-center">
    <button
      type="button"
      @click="preview"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
    >
      OK
    </button>
    <button
      type="button"
      @click="cancel"
      class="text-gray-600 hover:text-gray-800 hover:bg-red-300 px-4 py-2 rounded focus:outline-none"
    >
      キャンセル
    </button>
  </div>
</template>
