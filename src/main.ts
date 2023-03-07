import { v } from ".";

const schema = v.object({
  age: v.number(),
  name: v.string(),
  birthDate: v.date(),
  favorites: v
    .object({
      animal: v.string().optional(),
      color: v.string().optional(),
    })
    .optional(),
});

const result = schema.parseSafe({
  age: 12,
  name: "Luis",
  birthDate: new Date(2, 12, 2010),
  favorites: {
    color: "red",
  },
});

if (result.success === true) {
  const value = result.value;
}

//console.log(result);

const tuple = v.tuple([
  v.string(),
  v.number(),
  v.object({
    value: v.boolean(),
  }),
]);

console.log(tuple.parseSafe(["hello", 1, { value: 100 }]));
// [2].value