import {
  validate,
  validateOneTrue,
  validateStartEnd,
  validateMorningEvening,
  WEEK
} from "./fn";

describe("Test table validity", () => {
  test("One true", () => {
    expect(
      validateOneTrue({
        monday: {
          morning: false,
          evening: false
        }
      })
    ).toBe(false);

    expect(validateOneTrue(WEEK)).toBe(true);
  });

  test("Start is less then end", () => {
    expect(
      validateStartEnd({
        monday: {
          morningStartHour: 12,
          morningStartMinute: 0,
          morningEndHour: 8,
          morningEndMinute: 0,
          eveningStartHour: 14,
          eveningStartMinute: 0,
          eveningEndHour: 18,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    expect(
      validateStartEnd({
        monday: {
          morningStartHour: 8,
          morningStartMinute: 0,
          morningEndHour: 12,
          morningEndMinute: 0,
          eveningStartHour: 18,
          eveningStartMinute: 0,
          eveningEndHour: 14,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    expect(validateStartEnd(WEEK)).toBe(true);
  });

  test("Mornings are less then evenings", () => {
    expect(
      validateMorningEvening({
        monday: {
          morningStartHour: 16,
          morningStartMinute: 0,
          morningEndHour: 12,
          morningEndMinute: 0,
          eveningStartHour: 14,
          eveningStartMinute: 0,
          eveningEndHour: 18,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    expect(
      validateMorningEvening({
        monday: {
          morningStartHour: 8,
          morningStartMinute: 0,
          morningEndHour: 16,
          morningEndMinute: 0,
          eveningStartHour: 14,
          eveningStartMinute: 0,
          eveningEndHour: 18,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    expect(
      validateMorningEvening({
        monday: {
          morningStartHour: 20,
          morningStartMinute: 0,
          morningEndHour: 12,
          morningEndMinute: 0,
          eveningStartHour: 14,
          eveningStartMinute: 0,
          eveningEndHour: 18,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    expect(
      validateMorningEvening({
        monday: {
          morningStartHour: 8,
          morningStartMinute: 0,
          morningEndHour: 22,
          morningEndMinute: 0,
          eveningStartHour: 14,
          eveningStartMinute: 0,
          eveningEndHour: 18,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    expect(validateMorningEvening(WEEK)).toBe(true);
  });

  test("Overall test", () => {
    expect(
      validate({
        monday: {
          morning: false,
          evening: false
        }
      })
    ).toBe(false);

    expect(
      validate({
        monday: {
          morning: true,
          morningStartHour: 12,
          morningStartMinute: 0,
          morningEndHour: 8,
          morningEndMinute: 0,
          evening: true,
          eveningStartHour: 14,
          eveningStartMinute: 0,
          eveningEndHour: 18,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    expect(
      validate({
        monday: {
          morning: true,
          morningStartHour: 8,
          morningStartMinute: 0,
          morningEndHour: 12,
          morningEndMinute: 0,
          evening: true,
          eveningStartHour: 18,
          eveningStartMinute: 0,
          eveningEndHour: 14,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    expect(
      validate({
        monday: {
          morning: true,
          morningStartHour: 16,
          morningStartMinute: 0,
          morningEndHour: 12,
          morningEndMinute: 0,
          evening: true,
          eveningStartHour: 14,
          eveningStartMinute: 0,
          eveningEndHour: 18,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    expect(
      validate({
        monday: {
          morning: true,
          morningStartHour: 8,
          morningStartMinute: 0,
          morningEndHour: 16,
          morningEndMinute: 0,
          evening: true,
          eveningStartHour: 14,
          eveningStartMinute: 0,
          eveningEndHour: 18,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    expect(
      validate({
        monday: {
          morning: true,
          morningStartHour: 20,
          morningStartMinute: 0,
          morningEndHour: 12,
          morningEndMinute: 0,
          evening: true,
          eveningStartHour: 14,
          eveningStartMinute: 0,
          eveningEndHour: 18,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    expect(
      validate({
        monday: {
          morning: true,
          morningStartHour: 8,
          morningStartMinute: 0,
          morningEndHour: 22,
          morningEndMinute: 0,
          evening: true,
          eveningStartHour: 14,
          eveningStartMinute: 0,
          eveningEndHour: 18,
          eveningEndMinute: 0
        }
      })
    ).toBe(false);

    // expect(validate(WEEK)).toBe(true);
  });
});
