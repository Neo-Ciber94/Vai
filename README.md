# vai

A runtime type validation library.

## Why?

This library is a simple version of a type validation library inspired in `Zod`, mostly educational, prefer using other library like [Zod](https://zod.dev/) instead.

## Usage

```ts
import { createValidator } from "vai";

/// Define the validator to use in your application,
/// createValidator also accepts an object of validators to extend it
export const v = createValidator();

// Define a schema
const dateSchema = v.date();
dateSchema.parse(new Date("2023-1-1"));

// Define an object schema
const personSchema = v.object({
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

personSchema.parse({
    name: "Pauline",
    age: 23,
    email: "pauline@example.com",
    games: [
        {
            name: "Super Mario Odyssey",
            genre: "platformer",
            price: 39
        }
    ]
})

```
