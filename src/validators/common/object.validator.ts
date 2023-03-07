import { ValidationContext } from "../../core/context";
import {
  BaseArrayValidator,
  ValidationResult,
  Validator,
} from "../../core/validator";

type ValidatorShape = {
  [key: string]: Validator<unknown>;
};

/// Returns the keys of properties that are undefined
type UndefinedKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

// Make any undefined properties optional
type MakeUndefinedPropertiesOptional<T> = Omit<T, UndefinedKeys<T>> &
  Pick<Partial<T>, UndefinedKeys<T>>;

// This remove all utility types from `T` giving only the plain object
type UnwrapType<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// Here we make an object where properties types is the return type of the `parse`
// function of each validator recursively, also we make any undefined properties optional.
type _ObjectResult<T extends ValidatorShape> = MakeUndefinedPropertiesOptional<{
  [K in keyof T]: ReturnType<T[K]["parse"]>;
}>;

// Type unwrapped
type ObjectResult<T extends ValidatorShape> = UnwrapType<_ObjectResult<T>>;

export class ObjectValidator<
  T extends ValidatorShape,
  Output = ObjectResult<T>
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
      const arrayValidator =
        validator as unknown as BaseArrayValidator<unknown>;
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
