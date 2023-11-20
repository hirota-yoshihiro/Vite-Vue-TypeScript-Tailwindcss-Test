import { createRouter, createWebHistory } from "vue-router";

import EmployeeLogin from "../components/views/employee/EmployeeLogin.vue";
import EmployeeAttendanceEntry from "../components/views/employee/EmployeeAttendanceEntry.vue";

import AdminLogin from "../components/views/admin/AdminLogin.vue";
import AdminAttendanceEntry from "../components/views/admin/AdminAttendanceEntry.vue";

const routes = [
  {
    path: "/employee/login",
    name: "EmployeeLogin",
    component: EmployeeLogin,
  },
  {
    path: "/employee/attendance-entry",
    name: "EmployeeAttendanceEntry",
    component: EmployeeAttendanceEntry,
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/admin/attendance-entry",
    name: "AdminAttendanceEntry",
    component: AdminAttendanceEntry,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
