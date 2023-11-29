import { defineStore } from "pinia";

export const useStoreProjects = defineStore("projects", {
  state: () => ({
    projects: [
      {
        id: "",
        name: "",
        type: "",
      },
    ],
  }),
  actions: {
    getProjects(projects: any) {
      this.projects = projects;
    },
  },
});
