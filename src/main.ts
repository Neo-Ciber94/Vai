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

const validator = v.instanceof(Date);
console.log(validator.parseSafe(new Date()));
