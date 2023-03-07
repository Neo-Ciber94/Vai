import { describe, expect, test } from "vitest";
import { NullValidator } from "../../src/validators/common";

describe("NullValidator", () => {
  const nullValidator = new NullValidator();

  test("expect null is valid", () => {
    expect(nullValidator.parse(null)).toBeNull();
    expect(nullValidator.parseSafe(null).success).toBeTruthy();
  });

  test("input is not null", () => {
    expect(nullValidator.parseSafe(new Date()).success).toBeFalsy();
  });
});
