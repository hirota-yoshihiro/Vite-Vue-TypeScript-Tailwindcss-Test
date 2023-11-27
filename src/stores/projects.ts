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
      console.log(this.projects);
      this.projects = projects;
      console.log(this.projects);
    },
  },
});
