import { defineStore } from "pinia";

type AttendanceData = {
  projectCategory: string;
  startingDate: Date;
  finalDate: Date;
  overtime: number;
  lateNightOvertime: number;
  holidayWorkTime: number;
  salariedAndAbsenteeismAndPublicHolidayTime: number;
  companyClosureTime: number;
  projects: [
    {
      id: string;
      name: string;
      type: string;
      time: number;
    }
  ];
};

export const useStoreAttendanceData = defineStore("attendanceData", {
  state: () => ({
    attendanceData: {
      projectCategory: "",
      startingDate: new Date(),
      finalDate: new Date(),
      overtime: 0.0,
      lateNightOvertime: 0.0,
      holidayWorkTime: 0.0,
      salariedAndAbsenteeismAndPublicHolidayTime: 0.0,
      companyClosureTime: 0.0,
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
    getAttendanceData(attendanceData: AttendanceData) {
      this.attendanceData = attendanceData;
    },
  },
});
