import { describe, expect, test } from "vitest";
import { createValidator } from "../../src";

const v = createValidator();

describe("ExactLengthStringValidator", () => {
  const stringLength = v.string().length(5);

  test("string length within range", () => {
    expect(stringLength.parse("hello")).toStrictEqual("hello");
    expect(stringLength.parse("apple")).toStrictEqual("apple");
  });

  test("string length out range", () => {
    expect(() => stringLength.parse("pineapple")).toThrow();
  });
});

describe("MinLengthStringValidator", () => {
  const stringLength = v.string().min(4);

  test("string min length within range", () => {
    expect(stringLength.parse("pineapple")).toStrictEqual("pineapple");
    expect(stringLength.parse("1234")).toStrictEqual("1234");
  });

  test("string min length out range", () => {
    expect(() => stringLength.parse("red")).toThrow();
  });
});

describe("MaxLengthStringValidator", () => {
  const stringLength = v.string().max(8);

  test("string max length within range", () => {
    expect(stringLength.parse("hello")).toStrictEqual("hello");
    expect(stringLength.parse("12345678")).toStrictEqual("12345678");
  });

  test("string max length out range", () => {
    expect(() => stringLength.parse("Kono Subarashii Sekai ni Shukufuku wo!")).toThrow();
  });
});
