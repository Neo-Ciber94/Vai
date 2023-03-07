import { describe, expect, test } from "vitest";
import { StringValidator } from "../../src/validators/common";

describe("StringValidator", () => {
  const stringValidator = new StringValidator();

  test("expect string is valid", () => {
    expect(stringValidator.parse("purple")).toStrictEqual("purple");
    expect(stringValidator.parseSafe("adios").success).toBeTruthy();
  });

  test("input is not string", () => {
    expect(stringValidator.parseSafe(new Date()).success).toBeFalsy();
  });
});
