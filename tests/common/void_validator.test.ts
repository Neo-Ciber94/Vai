import { describe, expect, test } from "vitest";
import { VoidValidator } from "../../src/validators/common";

describe("VoidValidator", () => {
  const voidValidator = new VoidValidator();

  test("expect void is valid", () => {
    expect(voidValidator.parse(void 0)).toBeUndefined();
    expect(voidValidator.parseSafe(void 0).success).toBeTruthy();
  });

  test("input is not void", () => {
    expect(voidValidator.parseSafe(new Date()).success).toBeFalsy();
  });
});
