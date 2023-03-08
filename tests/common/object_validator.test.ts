import { describe, expect, test } from "vitest";
import { ObjectValidator } from "../../src/validators/common";
import { createValidator } from "../../src";

const v = createValidator();

describe("ObjectValidator", () => {
  const objectValidator = new ObjectValidator({
    name: v.string().trim().min(1),
    age: v.number().integer().min(1).max(120),
    email: v.string().email().optional(),
    games: v.array(
      v.object({
        name: v.string(),
        genre: v.enum(["shooter", "adventure", "platformer", "fighting"]),
        price: v.number().min(10).nullable(),
      })
    ),
  });

  test("expect valid object", () => {
    expect(
      objectValidator.parseSafe({
        name: "Pauline",
        age: 23,
        email: "pauline@example.com",
        games: [
          {
            name: "Super Mario Odyssey",
            genre: "platformer",
            price: 39,
          },
        ],
      }).success
    ).toBeTruthy();
  });

  test("input is no a valid enum value", () => {
    expect(objectValidator.parseSafe({
        name: "Rose",
        age: -43,
        email: "hello@.com"
    }).success).toBeFalsy();
  });
});
