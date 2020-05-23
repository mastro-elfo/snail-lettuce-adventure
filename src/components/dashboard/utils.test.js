import {
  andJoin,
  dateAddDhm,
  dhmline,
  dhm2str,
  formatDate,
  isWorking,
  pluralize,
  sla2dhm,
  workingIntervals
} from "./utils";

import { WEEK } from "../settings/fn";

describe("Convert sla string to dhm object", () => {
  test("1m", () => {
    expect(sla2dhm("1m")).toEqual({
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 1
    });
  });

  test("1h", () => {
    expect(sla2dhm("1h")).toEqual({
      weeks: 0,
      days: 0,
      hours: 1,
      minutes: 0
    });
  });

  test("1d", () => {
    expect(sla2dhm("1d")).toEqual({
      weeks: 0,
      days: 1,
      hours: 0,
      minutes: 0
    });
  });

  test("1w", () => {
    expect(sla2dhm("1w")).toEqual({
      weeks: 1,
      days: 0,
      hours: 0,
      minutes: 0
    });
  });

  test("1w 2d 3h 4m", () => {
    expect(sla2dhm("1w 2d 3h 4m")).toEqual({
      weeks: 1,
      days: 2,
      hours: 3,
      minutes: 4
    });
  });

  test("1w 3h", () => {
    expect(sla2dhm("1w 3h")).toEqual({
      weeks: 1,
      days: 0,
      hours: 3,
      minutes: 0
    });
  });

  test("2d 4m", () => {
    expect(sla2dhm("2d 4m")).toEqual({
      weeks: 0,
      days: 2,
      hours: 0,
      minutes: 4
    });
  });
});

describe("Convert dhm object to string", () => {
  test("1 week, 2 days, 3 hours and 4 minutes", () => {
    expect(
      dhm2str({
        weeks: 1,
        days: 2,
        hours: 3,
        minutes: 4
      })
    ).toEqual("1 week, 2 days, 3 hours and 4 minutes");
  });
});

describe("Create a line", () => {
  test("0 apples", () => {
    expect(dhmline(0, "apple", "apples")).toEqual("");
  });

  test("1 apple", () => {
    expect(dhmline(1, "apple", "apples")).toEqual("1 apple");
  });

  test("2 apples", () => {
    expect(dhmline(2, "apple", "apples")).toEqual("2 apples");
  });
});

describe("Pluralize a word", () => {
  test("Zero", () => {
    expect(pluralize(0, "singular", "plural")).toEqual("plural");
  });

  test("One", () => {
    expect(pluralize(1, "singular", "plural")).toEqual("singular");
  });

  test("Many", () => {
    expect(pluralize(2, "singular", "plural")).toEqual("plural");
  });
});

describe('Join a list with a final "and"', () => {
  test("Empty list", () => {
    expect(andJoin([], ", ", " and ")).toEqual("");
  });

  test("One element list", () => {
    expect(andJoin([1], ", ", " and ")).toEqual("1");
  });

  test("Two elements list", () => {
    expect(andJoin([1, 2], ", ", " and ")).toEqual("1 and 2");
  });

  test("Three or more elements list", () => {
    expect(andJoin([1, 2, 3], ", ", " and ")).toEqual("1, 2 and 3");
  });
});

describe("Uniform date format", () => {
  test("2020-01-01 12:00", () => {
    expect(formatDate(new Date("2020-01-01 12:00"))).toEqual(
      "2020-01-01 12:00"
    );
  });
});

describe("Add dhm object to date", () => {
  test("Add 1 week", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          weeks: 1,
          days: 0,
          hours: 0,
          minutes: 0
        })
      )
    ).toEqual("2020-01-08 12:00");
  });

  test("Add 1 day", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          weeks: 0,
          days: 1,
          hours: 0,
          minutes: 0
        })
      )
    ).toEqual("2020-01-02 12:00");
  });

  test("Add 1 hour", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          weeks: 0,
          days: 0,
          hours: 1,
          minutes: 0
        })
      )
    ).toEqual("2020-01-01 13:00");
  });

  test("Add 1 minute", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 1
        })
      )
    ).toEqual("2020-01-01 12:01");
  });

  test("Add 1 week, 2 days, 3 hours and 4 minutes", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          weeks: 1,
          days: 2,
          hours: 3,
          minutes: 4
        })
      )
    ).toEqual("2020-01-10 15:04");
  });
});

describe("DateTime inside or outside working interval", () => {
  test("Wednesday", () => {
    expect(isWorking(new Date("2020-01-01T00:00"), WEEK)).toBe(false);
    expect(isWorking(new Date("2020-01-01T08:29"), WEEK)).toBe(false);
    expect(isWorking(new Date("2020-01-01T08:30"), WEEK)).toBe(true);
    expect(isWorking(new Date("2020-01-01T12:30"), WEEK)).toBe(true);
    expect(isWorking(new Date("2020-01-01T12:31"), WEEK)).toBe(false);
    expect(isWorking(new Date("2020-01-01T14:29"), WEEK)).toBe(false);
    expect(isWorking(new Date("2020-01-01T14:30"), WEEK)).toBe(true);
    expect(isWorking(new Date("2020-01-01T18:30"), WEEK)).toBe(true);
    expect(isWorking(new Date("2020-01-01T18:31"), WEEK)).toBe(false);
    expect(isWorking(new Date("2020-01-01T23:59"), WEEK)).toBe(false);
  });
  test("Saturday", () => {
    expect(isWorking(new Date("2020-01-04T10:30"), WEEK)).toBe(true);
    expect(isWorking(new Date("2020-01-04T16:30"), WEEK)).toBe(false);
  });
  test("Sunday", () => {
    expect(isWorking(new Date("2020-01-05T10:30"), WEEK)).toBe(false);
    expect(isWorking(new Date("2020-01-05T16:30"), WEEK)).toBe(false);
  });
});
