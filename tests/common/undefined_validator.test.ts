import { describe, expect, test } from "vitest";
import { UndefinedValidator } from "../../src/validators/common";

describe("UndefinedValidator", () => {
  const undefinedValidator = new UndefinedValidator();

  test("expect undefined is valid", () => {
    expect(undefinedValidator.parse(undefined)).toBeUndefined();
    expect(undefinedValidator.parseSafe(undefined).success).toBeTruthy();
  });

  test("input is not undefined", () => {
    expect(undefinedValidator.parseSafe(new Date()).success).toBeFalsy();
  });
});
