import { describe, expect, test } from "vitest";
import { NanValidator } from "../../src/validators/common";

describe("NanValidator", () => {
  const nanValidator = new NanValidator();

  test("expect no a number", () => {
    expect(nanValidator.parseSafe(null).success).toBeTruthy();
    expect(nanValidator.parseSafe({ value: 23 }).success).toBeTruthy();
    expect(nanValidator.parseSafe(false).success).toBeTruthy();
    expect(nanValidator.parseSafe("hello").success).toBeTruthy();
    expect(nanValidator.parseSafe(Number("hello")).success).toBeTruthy();
    expect(nanValidator.parseSafe(NaN).success).toBeTruthy();
  });

  test("input is a number", () => {
    expect(nanValidator.parseSafe(11234).success).toBeFalsy();

  });
});
