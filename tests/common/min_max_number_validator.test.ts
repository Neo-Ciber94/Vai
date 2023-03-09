import { describe, expect, test } from "vitest";
import { createValidator } from "../../src";

const v = createValidator();

describe("MaxNumberValidator", () => {
  const maxValidator = v.number().max(10);

  test("number is within max range", () => {
    expect(maxValidator.parse(9)).toStrictEqual(9);
    expect(maxValidator.parse(10)).toStrictEqual(10);
    expect(maxValidator.parse(-4)).toStrictEqual(-4);
  });

  test("number is out max range", () => {
    expect(() => maxValidator.parse(12)).toThrow();
  });
});

describe("MinNumberValidator", () => {
  const minValidator = v.number().min(2);

  test("number is within min range", () => {
    expect(minValidator.parse(2)).toStrictEqual(2);
    expect(minValidator.parse(3)).toStrictEqual(3);
    expect(minValidator.parse(23)).toStrictEqual(23);
  });

  test("number is out min range", () => {
    expect(() => minValidator.parse(1)).toThrow();
    expect(() => minValidator.parse(-2)).toThrow();
  });
});
