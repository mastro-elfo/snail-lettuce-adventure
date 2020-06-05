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

export function getHolidays() {
  const holidays = get("holidays");
  if (!holidays) return HOLIDAYS;
  return Object.assign(holidays, HOLIDAYS);
}

/**
 * Returns `true` if `table` is valid, `false` otherwise
 * @param  array table [description]
 * @return bool       [description]
 */
export function validate(table) {
  // At leas 1 day and 1 morning/evening must be true
  if (!validateOneTrue(table)) return false;

  // Each start must be less than the corresponding end
  if (!validateStartEnd(table)) return false;

  // Morning times must be less than evening's
  if (!validateMorningEvening(table)) return false;

  return true;
}

export const validateOneTrue = table =>
  Object.keys(table)
    .map(v => [table[v].morning, table[v].evening])
    .reduce((c, i) => c.concat(i), [])
    .some(v => v);

export const validateStartEnd = table =>
  Object.keys(table)
    .map(v => [
      +new Date(
        2020,
        0,
        1,
        table[v].morningStartHour,
        table[v].morningStartMinute
      ) <
        +new Date(
          2020,
          0,
          1,
          table[v].morningEndHour,
          table[v].morningEndMinute
        ),
      +new Date(
        2020,
        0,
        1,
        table[v].eveningStartHour,
        table[v].eveningStartMinute
      ) <
        +new Date(
          2020,
          0,
          1,
          table[v].eveningEndHour,
          table[v].eveningEndMinute
        )
    ])
    .reduce((c, i) => c.concat(i), [])
    .every(v => v);

export const validateMorningEvening = table =>
  Object.keys(table)
    .map(v => [
      +new Date(
        2020,
        0,
        1,
        table[v].morningStartHour,
        table[v].morningStartMinute
      ) <
        +new Date(
          2020,
          0,
          1,
          table[v].eveningStartHour,
          table[v].eveningStartMinute
        ),
      +new Date(
        2020,
        0,
        1,
        table[v].morningStartHour,
        table[v].morningStartMinute
      ) <
        +new Date(
          2020,
          0,
          1,
          table[v].eveningEndHour,
          table[v].eveningEndMinute
        ),
      +new Date(
        2020,
        0,
        1,
        table[v].morningEndHour,
        table[v].morningEndMinute
      ) <
        +new Date(
          2020,
          0,
          1,
          table[v].eveningStartHour,
          table[v].eveningStartMinute
        ),
      +new Date(
        2020,
        0,
        1,
        table[v].morningEndHour,
        table[v].morningEndMinute
      ) <
        +new Date(
          2020,
          0,
          1,
          table[v].eveningEndHour,
          table[v].eveningEndMinute
        )
    ])
    .reduce((c, i) => c.concat(i), [])
    .every(v => v);

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

export const HOLIDAYS = {
  jan1: {
    title: "First of the year",
    active: true,
    month: 0,
    day: 1
  },
  jan6: {
    title: "Epiphany",
    active: true,
    month: 0,
    day: 6
  },
  easterMonday: {
    title: "Easter monday",
    active: false,
    month: 3,
    day: 13
  },
  apr25: {
    title: "Liberation day",
    active: true,
    month: 3,
    day: 25
  },
  may1: {
    title: "International workers' day",
    active: true,
    month: 4,
    day: 1
  },
  nationalDay: {
    title: "National day",
    active: true,
    month: 5,
    day: 2
  },
  aug15: {
    title: "Assumption of Mary",
    active: true,
    month: 7,
    day: 15
  },
  nov1: {
    title: "All saints",
    active: true,
    month: 10,
    day: 1
  },
  dec8: {
    title: "Immacolate conception",
    active: true,
    month: 11,
    day: 8
  },
  dec25: {
    title: "Christmas",
    active: true,
    month: 11,
    day: 25
  },
  dec26: {
    title: "Saint Stephen's day",
    active: true,
    month: 11,
    day: 26
  },
  localDay: {
    title: "Local day",
    active: false,
    month: 0,
    day: 1
  }
};
