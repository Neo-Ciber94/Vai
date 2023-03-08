import { describe, expect, test } from "vitest";
import { DateValidator } from "../../src/validators/common";

describe("DateValidator", () => {
  const dateValidator = new DateValidator();

  test("expect date is valid", () => {
    expect(dateValidator.parse(new Date(2023, 3, 8))).toStrictEqual(
      new Date(2023, 3, 8)
    );
    expect(dateValidator.parseSafe("1999-2-2").success).toBeTruthy();
  });

  test("input is not a date", () => {
    expect(dateValidator.parseSafe(123).success).toBeFalsy();
  });
});
