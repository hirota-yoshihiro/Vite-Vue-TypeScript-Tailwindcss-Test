import { createRouter, createWebHistory } from "vue-router";

// Employee Relation Routes
import EmployeeLogin from "@/components/views/employee/EmployeeLogin.vue";
import EmployeeDashBoard from "@/layouts/dashboard/Dashboard.vue";
import EmployeeListOfProjects from "@/components/views/employee/EmployeeListOfProjects.vue";
import EmployeeAttendanceEntry from "@/components/views/employee/EmployeeAttendanceEntry.vue";

// Admin Relation Routes
import AdminLogin from "@/components/views/admin/AdminLogin.vue";

const routes = [
  {
    name: "EmployeeLogin",
    path: "/employee/login",
    component: EmployeeLogin,
  },
  {
    name: "EmployeeDashboard",
    path: "/employee/dashboard",
    component: EmployeeDashBoard,
    children: [
      {
        name: "EmployeeListOfProjects",
        path: "/employee/dashboard/list-of-projects",
        component: EmployeeListOfProjects,
      },
      {
        name: "EmployeeAttendanceEntry ",
        path: "/employee/dashboard/attendance-entry",
        component: EmployeeAttendanceEntry,
      },
    ],
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
