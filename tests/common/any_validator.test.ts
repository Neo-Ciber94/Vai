import { describe, expect, test } from "vitest";
import { AnyValidator } from "../../src/validators/common";

describe("AnyValidator", () => {
  const anyValidator = new AnyValidator();

  test("expect any type is valid", () => {
    expect(anyValidator.parse(1)).toStrictEqual(1);

    expect(anyValidator.parse("hello")).toStrictEqual("hello");

    expect(anyValidator.parse(true)).toStrictEqual(true);

    expect(anyValidator.parse(new Date(9999))).toStrictEqual(new Date(9999));

    expect(anyValidator.parse(23900000000000n)).toStrictEqual(23900000000000n);

    expect(anyValidator.parseSafe(Symbol("something")).success).toBeTruthy();

    expect(anyValidator.parse({ value: "pong" })).toStrictEqual({
      value: "pong",
    });
  });
});
