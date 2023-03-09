import { describe, expect, test } from "vitest";
import { RecordValidator } from "../../src/validators/common";
import { createValidator } from "../../src";

const v = createValidator();

describe("RecordValidator", () => {
  const recordValidator = new RecordValidator(
    v.string().min(3),
    v.object({
      value: v.number().min(10).max(30),
    })
  );

  test("expect a valid record", () => {
    expect(
      recordValidator.parseSafe({
        one: { value: 15 },
        two: { value: 20 },
        three: { value: 25 },
      }).success
    ).toBeTruthy();
  });

  test("input is not a valid record", () => {
    expect(
      recordValidator.parseSafe({
        abc: { value: 10 },
        ab: { value: 15 },
        a: { value: 20 },
      }).success
    ).toBeFalsy();
  });
});
