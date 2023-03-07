import { ValidationContext } from "../../core/context";
import { BaseArrayValidator, ValidationResult, Validator } from "../../core/validator";
import { ArrayValidator } from "./array.validator";

type ValidatorShape = {
  [key: string]: Validator<unknown>;
};

// type PartialBy<T, K extends keyof T> = {
//   [P in Exclude<keyof T, K>]: T[P];
// } & { [P in K]?: T[P] };

// type UndefinedKeys<T> = {
//   [K in keyof T]-?: undefined extends T[K] ? K : never;
// }[keyof T];

// type DefinedKeys<T> = {
//   [K in keyof T]-?: undefined extends T[K] ? never : K;
// }[keyof T];

// type PartialObject<T> = Pick<T, UndefinedKeys<T>>;

export class ObjectValidator<
  T extends ValidatorShape,
  Output = {
    [K in keyof T]: ReturnType<T[K]["parse"]>;
  }
> extends Validator<Output> {
  constructor(private readonly shape: T) {
    super();
  }

  parseSafe(value: unknown): ValidationResult<Output> {
    if (typeof value !== "object") {
      return {
        error: `expected object but was ${typeof value}`,
      };
    }

    const context = new ValidationContext();
    const path: string[] = [];
    const obj = parseWithContext(
      value,
      this.shape,
      path,
      context
    ) as unknown as Output;

    if (!context.isValid) {
      const validationError = context.errors[0];
      const path = (validationError.path || []).join(".");
      const error = `${path}: ${validationError.message}`;
      return { error };
    }

    return { success: true, value: obj };
  }
}

function parseWithContext(
  obj: unknown,
  validatorObj: ValidatorShape,
  path: string[],
  ctx: ValidationContext
) {
  const output: any = {};

  for (const key of Object.keys(validatorObj)) {
    const value = (obj as any)[key];
    const validator = validatorObj[key];

    // Recursion if is an object
    if (typeof value === "object" && !(validator instanceof Validator)) {
      const nestedValidator = validator as unknown as ValidatorShape;
      const nestedPath = [...path, key];
      const val = parseWithContext(value, nestedValidator, nestedPath, ctx);

      // We ignore undefined returns
      if (val !== undefined) {
        output[key] = val;
      }
    }

    // For arrays we should track the path as a index
    else if (Array.isArray(value)) {
      const arrayValidator = validator as unknown as BaseArrayValidator<unknown>;
      const result = arrayValidator.parseArraySafe(value);
      const index = result.index;
      const currentPath =
        index != null ? [...path, key, index] : [...path, key];

      if (result.success !== true) {
        ctx.addError({
          message: result.error,
          path: currentPath,
          value,
        });
      } else {
        output[key] = result.value;
      }
    }

    // Fallback
    else {
      const currentPath = [...path, key];
      const result = validator.parseSafe(value);

      if (result.success !== true) {
        ctx.addError({
          message: result.error,
          path: currentPath,
          value,
        });
      } else {
        const val = result.value;

        // We ignore undefined returns
        if (val !== undefined) {
          output[key] = val;
        }
      }
    }
  }

  return output;
}
