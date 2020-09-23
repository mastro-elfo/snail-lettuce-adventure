import {
  andJoin,
  config2date,
  dateAddDhm,
  dhmline,
  dhm2str,
  evalLength,
  findNextStart,
  formatDate,
  isWorking,
  list2length,
  pluralize,
  sla2dhm,
  lengthEnd,
  table2list,
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

  test("1 w 2 d 3 h 4 m", () => {
    expect(sla2dhm("1 w 2 d 3 h 4 m")).toEqual({
      weeks: 1,
      days: 2,
      hours: 3,
      minutes: 4
    });
  });
});

// TODO: fail after i18n
// describe("Convert dhm object to string", () => {
//   test("1 week, 2 days, 3 hours and 4 minutes", () => {
//     expect(
//       dhm2str({
//         weeks: 1,
//         days: 2,
//         hours: 3,
//         minutes: 4
//       })
//     ).toEqual("1 week, 2 days, 3 hours and 4 minutes");
//   });
//
//   test("7 days", () => {
//     expect(
//       dhm2str({
//         days: 7
//       })
//     ).toBe("1 week");
//   });
//
//   test("24 hours", () => {
//     expect(
//       dhm2str({
//         hours: 24
//       })
//     ).toBe("1 day");
//   });
//
//   test("60 minutes", () => {
//     expect(
//       dhm2str({
//         minutes: 60
//       })
//     ).toBe("1 hour");
//   });
// });

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
      "2020 01 01, Wed 12:00"
    );
  });
});

describe("Add dhm object to date", () => {
  test("Add 1 week", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          weeks: 1
        })
      )
    ).toEqual("2020 01 08, Wed 12:00");
  });

  test("Add 1 day", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          days: 1
        })
      )
    ).toEqual("2020 01 02, Thu 12:00");
  });

  test("Add 1 hour", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          hours: 1
        })
      )
    ).toEqual("2020 01 01, Wed 13:00");
  });

  test("Add 1 minute", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          minutes: 1
        })
      )
    ).toEqual("2020 01 01, Wed 12:01");
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
    ).toEqual("2020 01 10, Fri 15:04");
  });

  test("Add 7 days", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          days: 7
        })
      )
    ).toEqual("2020 01 08, Wed 12:00");
  });

  test("Add 24 hours", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          hours: 24
        })
      )
    ).toEqual("2020 01 02, Thu 12:00");
  });

  test("Add 60 minutes", () => {
    expect(
      formatDate(
        dateAddDhm(new Date("2020-01-01 12:00"), {
          minutes: 60
        })
      )
    ).toEqual("2020 01 01, Wed 13:00");
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

describe("Convert a config input to a date", () => {
  test("morningStart", () => {
    expect(
      formatDate(config2date(new Date("2020-01-01"), WEEK, "morningStart"))
    ).toEqual("2020 01 01, Wed 08:30");
  });
  test("morningEnd", () => {
    expect(
      formatDate(config2date(new Date("2020-01-01"), WEEK, "morningEnd"))
    ).toEqual("2020 01 01, Wed 12:30");
  });
  test("eveningStart", () => {
    expect(
      formatDate(config2date(new Date("2020-01-01"), WEEK, "eveningStart"))
    ).toEqual("2020 01 01, Wed 14:30");
  });
  test("eveningEnd", () => {
    expect(
      formatDate(config2date(new Date("2020-01-01"), WEEK, "eveningEnd"))
    ).toEqual("2020 01 01, Wed 18:30");
  });
  test("Invalid label", () => {
    expect(
      config2date(new Date("2020-01-01"), WEEK, "invalid label")
    ).toBeNull();
  });
  test("Sunday", () => {
    expect(
      config2date(new Date("2020-01-05"), WEEK, "morningStart")
    ).toBeNull();
  });
});

describe("Evaluate effective time given a list of start/end pairs", () => {
  test("Empty list", () => {
    expect(list2length([])).toBe(0);
  });
  test("length 1", () => {
    expect(
      list2length([
        {
          start: new Date("2020-01-01"),
          end: new Date("2020-01-02")
        }
      ])
    ).toBe(24 * 60 * 60 * 1000);
  });
  test("length 2", () => {
    expect(
      list2length([
        {
          start: new Date("2020-01-01"),
          end: new Date("2020-01-02")
        },
        {
          start: new Date("2020-01-03"),
          end: new Date("2020-01-04")
        }
      ])
    ).toBe(2 * 24 * 60 * 60 * 1000);
  });
});

describe("Find the next start in the table list", () => {
  test("Wednesday night", () => {
    expect(formatDate(findNextStart(new Date("2020-01-01"), WEEK))).toBe(
      "2020 01 01, Wed 08:30"
    );
  });

  test("Wednesday morning", () => {
    expect(formatDate(findNextStart(new Date("2020-01-01T10:30"), WEEK))).toBe(
      "2020 01 01, Wed 14:30"
    );
  });

  test("Wednesday evening", () => {
    expect(formatDate(findNextStart(new Date("2020-01-01T16:30"), WEEK))).toBe(
      "2020 01 02, Thu 08:30"
    );
  });

  test("Saturday morning", () => {
    expect(formatDate(findNextStart(new Date("2020-01-04T10:30"), WEEK))).toBe(
      "2020 01 06, Mon 08:30"
    );
  });
});

describe("Create the list of working intervals", () => {
  test("Wednesday morning", () => {
    expect(
      table2list(
        new Date("2020-01-01T08:30"),
        new Date("2020-01-01T12:30"),
        WEEK,
        []
      ).map(({ start, end }) => ({
        start: formatDate(start),
        end: formatDate(end)
      }))
    ).toEqual([
      {
        start: "2020 01 01, Wed 08:30",
        end: "2020 01 01, Wed 12:30"
      }
    ]);
  });

  test("Wednesday all day", () => {
    expect(
      table2list(
        new Date("2020-01-01T08:30"),
        new Date("2020-01-01T18:30"),
        WEEK,
        []
      ).map(({ start, end }) => ({
        start: formatDate(start),
        end: formatDate(end)
      }))
    ).toEqual([
      {
        start: "2020 01 01, Wed 08:30",
        end: "2020 01 01, Wed 12:30"
      },
      {
        start: "2020 01 01, Wed 14:30",
        end: "2020 01 01, Wed 18:30"
      }
    ]);
  });

  test("Wednesday all day", () => {
    expect(
      table2list(
        new Date("2020-01-01T08:30"),
        new Date("2020-01-02T18:30"),
        WEEK,
        []
      ).map(({ start, end }) => ({
        start: formatDate(start),
        end: formatDate(end)
      }))
    ).toEqual([
      {
        start: "2020 01 01, Wed 08:30",
        end: "2020 01 01, Wed 12:30"
      },
      {
        start: "2020 01 01, Wed 14:30",
        end: "2020 01 01, Wed 18:30"
      },
      {
        start: "2020 01 02, Thu 08:30",
        end: "2020 01 02, Thu 12:30"
      },
      {
        start: "2020 01 02, Thu 14:30",
        end: "2020 01 02, Thu 18:30"
      }
    ]);
  });

  test("Wednesday all day", () => {
    expect(
      table2list(
        new Date("2020-01-01T08:30"),
        new Date("2020-01-01T14:30"),
        WEEK,
        []
      ).map(({ start, end }) => ({
        start: formatDate(start),
        end: formatDate(end)
      }))
    ).toEqual([
      {
        start: "2020 01 01, Wed 08:30",
        end: "2020 01 01, Wed 12:30"
      }
    ]);
  });
});

describe("Evaluate the effective length between start and end", () => {
  test("1 hour long", () => {
    expect(
      evalLength(
        new Date("2020-01-01T08:30"),
        new Date("2020-01-01T09:30"),
        WEEK
      )
    ).toBe(60 * 60 * 1000);
  });

  test("8 hours long", () => {
    expect(
      evalLength(
        new Date("2020-01-01T08:30"),
        new Date("2020-01-01T18:30"),
        WEEK
      )
    ).toBe(8 * 60 * 60 * 1000);
  });

  test("16 hours long", () => {
    expect(
      evalLength(
        new Date("2020-01-01T08:30"),
        new Date("2020-01-02T18:30"),
        WEEK
      )
    ).toBe(16 * 60 * 60 * 1000);
  });

  test("Weekend", () => {
    expect(
      evalLength(
        new Date("2020-01-04T08:30"),
        new Date("2020-01-06T18:30"),
        WEEK
      )
    ).toBe(12 * 60 * 60 * 1000);
  });
});

describe("Evaluate the end of a length", () => {
  test("Wednesday 4h", () => {
    expect(
      formatDate(
        lengthEnd(new Date("2020-01-01T08:30"), 4 * 60 * 60 * 1000, WEEK)
      )
    ).toBe("2020 01 01, Wed 12:30");
  });

  test("Wednesday 6h", () => {
    expect(
      formatDate(
        lengthEnd(new Date("2020-01-01T08:30"), 6 * 60 * 60 * 1000, WEEK)
      )
    ).toBe("2020 01 01, Wed 16:30");
  });

  test("Wednesday 8h", () => {
    expect(
      formatDate(
        lengthEnd(new Date("2020-01-01T08:30"), 8 * 60 * 60 * 1000, WEEK)
      )
    ).toBe("2020 01 01, Wed 18:30");
  });

  test("Wednesday 12h", () => {
    expect(
      formatDate(
        lengthEnd(new Date("2020-01-01T08:30"), 12 * 60 * 60 * 1000, WEEK)
      )
    ).toBe("2020 01 02, Thu 12:30");
  });

  test("Wednesday 32h", () => {
    expect(
      formatDate(
        lengthEnd(new Date("2020-01-01T08:30"), 32 * 60 * 60 * 1000, WEEK)
      )
    ).toBe("2020 01 06, Mon 12:30");
  });

  test("Wednesday 2h, outside working hours", () => {
    expect(
      formatDate(
        lengthEnd(new Date("2020-01-01T08:00"), 2 * 60 * 60 * 1000, WEEK)
      )
    ).toBe("2020 01 01, Wed 10:00");
  });
});

describe("Test real cases", () => {
  test("1", () => {
    expect(
      formatDate(
        lengthEnd(
          new Date("2020-09-15T14:29"),
          evalLength(
            new Date(dateAddDhm(new Date("2020-09-15T14:29"), sla2dhm("3h"))),
            new Date("2020-09-18T09:29"),
            WEEK
          ),
          WEEK
        )
      )
    ).toBe("2020 09 17, Thu 16:29");
  });
});
