import { createValidator } from ".";

const v = createValidator();

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

const union = v.union([v.string(), v.number(), v.boolean()]);
const tuple = v.tuple([v.string(), v.number(), v.boolean()]);

const v1 = union.parse(["hello", 12, true]);
const v2 = tuple.parse(["hello", 12, true]);
// [2].value
