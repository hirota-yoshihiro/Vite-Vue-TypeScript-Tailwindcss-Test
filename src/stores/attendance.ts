import { defineStore } from "pinia";

type Attendance = {
  absenteeismTime: number;
  annualVacationTime: number;
  companyClosureTime: number;
  finalDate: Date;
  holidayWorkTime: number;
  isDisplayAttendancePage: boolean;
  lateNightOverTime: number;
  overTime: number;
  publicHolidayTime: number;
  startingDate: Date;
  projects: [
    {
      id: string;
      name: string;
      type: any;
      time: number;
    }
  ];
};

export const useStoreAttendance = defineStore("attendance", {
  state: () => ({
    attendance: {
      absenteeismTime: 0.0,
      annualVacationTime: 0.0,
      companyClosureTime: 0.0,
      finalDate: new Date(),
      holidayWorkTime: 0.0,
      isDisplayAttendancePage: true,
      lateNightOverTime: 0.0,
      overTime: 0.0,
      publicHolidayTime: 0.0,
      startingDate: new Date(),
      projects: [
        {
          id: "",
          name: "",
          type: "",
          time: 0,
        },
      ],
    },
  }),
  actions: {
    getAttendance(attendance: Attendance) {
      this.attendance = attendance;
    },

    getAbsenteeismTime(absenteeismTime: number) {
      this.attendance.absenteeismTime = absenteeismTime;
    },

    getAnnualVacationTime(annualVacationTime: number) {
      this.attendance.annualVacationTime = annualVacationTime;
    },

    getCompanyClosureTime(companyClosureTime: number) {
      this.attendance.companyClosureTime = companyClosureTime;
    },

    getFinalDate(finalDate: Date) {
      this.attendance.finalDate = finalDate;
    },

    getHolidayWorkTime(holidayWorkTime: number) {
      this.attendance.holidayWorkTime = holidayWorkTime;
    },

    getIsDisplayAttendancePage(isDisplayAttendancePage: boolean) {
      this.attendance.isDisplayAttendancePage = isDisplayAttendancePage;
    },

    getLateNightOverTime(lateNightOverTime: number) {
      this.attendance.lateNightOverTime = lateNightOverTime;
    },

    getOverTime(overTime: number) {
      this.attendance.overTime = overTime;
    },

    getPublicHolidayTime(publicHolidayTime: number) {
      this.attendance.publicHolidayTime = publicHolidayTime;
    },

    getProjects(projects: Attendance["projects"]) {
      this.attendance.projects = projects;
    },

    getStartingDate(startingDate: Date) {
      this.attendance.startingDate = startingDate;
    },
  },
});
