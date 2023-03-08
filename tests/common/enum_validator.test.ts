import { describe, expect, test } from "vitest";
import { EnumValidator } from "../../src/validators/common";

describe("EnumValidator", () => {
  const enumValidator = new EnumValidator(["red", "blue", "green"]);

  test("expect valid enum values", () => {
    expect(enumValidator.parse("red")).toStrictEqual("red");
    expect(enumValidator.parse("blue")).toStrictEqual("blue");
    expect(enumValidator.parse("green")).toStrictEqual("green");

    expect(enumValidator.parseSafe("red").success).toBeTruthy();
  });

  test("input is no a valid enum value", () => {
    expect(enumValidator.parseSafe("yellow").success).toBeFalsy();
  });
});
