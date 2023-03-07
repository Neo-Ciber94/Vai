import { describe, expect, test } from "vitest";
import { NumberValidator } from "../../src/validators/common";

describe("NumberValidator", () => {
  const numberValidator = new NumberValidator();

  test("expect number is valid", () => {
    expect(numberValidator.parse(23)).toStrictEqual(23);
    expect(numberValidator.parseSafe(44).success).toBeTruthy();
  });

  test("input is not number", () => {
    expect(numberValidator.parseSafe("hello").success).toBeFalsy();
  });
});
