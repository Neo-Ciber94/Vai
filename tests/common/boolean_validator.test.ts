import { describe, expect, test } from "vitest";
import { BooleanValidator } from "../../src/validators/common";

describe("BooleanValidator", () => {
  const booleanValidator = new BooleanValidator();

  test("expect boolean is valid", () => {
    expect(booleanValidator.parse(false)).toStrictEqual(false);
    expect(booleanValidator.parseSafe(true).success).toBeTruthy();
  });

  test("input is not boolean", () => {
    expect(booleanValidator.parseSafe(new Date()).success).toBeFalsy();
  });
});
