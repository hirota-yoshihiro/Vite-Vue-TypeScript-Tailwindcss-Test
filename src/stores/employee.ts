import { defineStore } from "pinia";

export const useStoreEmployee = defineStore("employee", {
  state: () => ({
    employee: {
      id: "",
      name: "",
    },
  }),
  actions: {
    getEmployee(employee: any) {
      this.employee.id = employee.employeeId;
      this.employee.name = employee.employeeName;
    },
  },
});
