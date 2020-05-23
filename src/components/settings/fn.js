const storage = localStorage;

const _id = id => `sla-set-${id}`;

export function set(id, value) {
  storage.setItem(_id(id), JSON.stringify(value));
}

export function get(id) {
  return JSON.parse(storage.getItem(_id(id)));
}

export function getWeek() {
  const week = get("week");
  if (!week) return WEEK;
  return week;
}

export const WEEK = {
  monday: {
    morning: true,
    morningStart: "08:30",
    morningStartHour: 8,
    morningStartMinute: 30,
    morningEnd: "12:30",
    morningEndHour: 12,
    morningEndMinute: 30,
    evening: true,
    eveningStart: "14:30",
    eveningStartHour: 14,
    eveningStartMinute: 30,
    eveningEnd: "18:30",
    eveningEndHour: 18,
    eveningEndMinute: 30
  },
  tuesday: {
    morning: true,
    morningStart: "08:30",
    morningStartHour: 8,
    morningStartMinute: 30,
    morningEnd: "12:30",
    morningEndHour: 12,
    morningEndMinute: 30,
    evening: true,
    eveningStart: "14:30",
    eveningStartHour: 14,
    eveningStartMinute: 30,
    eveningEnd: "18:30",
    eveningEndHour: 18,
    eveningEndMinute: 30
  },
  wednesday: {
    morning: true,
    morningStart: "08:30",
    morningStartHour: 8,
    morningStartMinute: 30,
    morningEnd: "12:30",
    morningEndHour: 12,
    morningEndMinute: 30,
    evening: true,
    eveningStart: "14:30",
    eveningStartHour: 14,
    eveningStartMinute: 30,
    eveningEnd: "18:30",
    eveningEndHour: 18,
    eveningEndMinute: 30
  },
  thursday: {
    morning: true,
    morningStart: "08:30",
    morningStartHour: 8,
    morningStartMinute: 30,
    morningEnd: "12:30",
    morningEndHour: 12,
    morningEndMinute: 30,
    evening: true,
    eveningStart: "14:30",
    eveningStartHour: 14,
    eveningStartMinute: 30,
    eveningEnd: "18:30",
    eveningEndHour: 18,
    eveningEndMinute: 30
  },
  friday: {
    morning: true,
    morningStart: "08:30",
    morningStartHour: 8,
    morningStartMinute: 30,
    morningEnd: "12:30",
    morningEndHour: 12,
    morningEndMinute: 30,
    evening: true,
    eveningStart: "14:30",
    eveningStartHour: 14,
    eveningStartMinute: 30,
    eveningEnd: "18:30",
    eveningEndHour: 18,
    eveningEndMinute: 30
  },
  saturday: {
    morning: true,
    morningStart: "08:30",
    morningStartHour: 8,
    morningStartMinute: 30,
    morningEnd: "12:30",
    morningEndHour: 12,
    morningEndMinute: 30,
    evening: false,
    eveningStart: "14:30",
    eveningStartHour: 14,
    eveningStartMinute: 30,
    eveningEnd: "18:30",
    eveningEndHour: 18,
    eveningEndMinute: 30
  },
  sunday: {
    morning: false,
    morningStart: "08:30",
    morningStartHour: 8,
    morningStartMinute: 30,
    morningEnd: "12:30",
    morningEndHour: 12,
    morningEndMinute: 30,
    evening: false,
    eveningStart: "14:30",
    eveningStartHour: 14,
    eveningStartMinute: 30,
    eveningEnd: "18:30",
    eveningEndHour: 18,
    eveningEndMinute: 30
  }
};
