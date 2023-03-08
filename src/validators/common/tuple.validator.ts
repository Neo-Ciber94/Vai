import { BaseArrayValidator, Validator } from "../../core/validator";
import { ArrayValidationResult } from "./array.validator";

// Map each index to the return type of the `parse` method of the element in that index
type MakeValidatorTuple<T extends Validator<any>[]> = {
  [K in keyof T]: ReturnType<T[K]["parse"]>;
};

export class TupleValidator<
  T extends Validator<any>[],
  Output = MakeValidatorTuple<T>
> extends BaseArrayValidator<Output> {
  constructor(private readonly schema: T) {
    super();
  }

  parseArraySafe(value: unknown): ArrayValidationResult<Output> {
    if (!Array.isArray(value)) {
      return {
        error: `expected an array but was ${typeof value}`,
      };
    }

    for (let index = 0; index < value.length; index++) {
      const obj = value[index];
      const validator = this.schema[index];
      const result = validator.parseSafe(obj);

      if (result.success !== true) {
        return {
          error: result.error,
          index,
        };
      }
    }

    return {
      success: true,
      value: value as unknown as Output,
    };
  }
}
