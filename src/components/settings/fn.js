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

const WEEK = {
  monday: {
    morning: true,
    morningStart: "2020-01-01T08:30",
    morningEnd: "2020-01-01T12:30",
    evening: true,
    eveningStart: "2020-01-01T14:30",
    eveningEnd: "2020-01-01T18:30"
  },
  tuesday: {
    morning: true,
    morningStart: "2020-01-01T08:30",
    morningEnd: "2020-01-01T12:30",
    evening: true,
    eveningStart: "2020-01-01T14:30",
    eveningEnd: "2020-01-01T18:30"
  },
  wednesday: {
    morning: true,
    morningStart: "2020-01-01T08:30",
    morningEnd: "2020-01-01T12:30",
    evening: true,
    eveningStart: "2020-01-01T14:30",
    eveningEnd: "2020-01-01T18:30"
  },
  thursday: {
    morning: true,
    morningStart: "2020-01-01T08:30",
    morningEnd: "2020-01-01T12:30",
    evening: true,
    eveningStart: "2020-01-01T14:30",
    eveningEnd: "2020-01-01T18:30"
  },
  friday: {
    morning: true,
    morningStart: "2020-01-01T08:30",
    morningEnd: "2020-01-01T12:30",
    evening: true,
    eveningStart: "2020-01-01T14:30",
    eveningEnd: "2020-01-01T18:30"
  },
  saturday: {
    morning: true,
    morningStart: "2020-01-01T08:30",
    morningEnd: "2020-01-01T12:30",
    evening: false,
    eveningStart: "2020-01-01T14:30",
    eveningEnd: "2020-01-01T18:30"
  },
  sunday: {
    morning: false,
    morningStart: "2020-01-01T08:30",
    morningEnd: "2020-01-01T12:30",
    evening: false,
    eveningStart: "2020-01-01T14:30",
    eveningEnd: "2020-01-01T18:30"
  }
};
