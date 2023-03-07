import {
  ArrayValidationResult,
  BaseArrayValidator,
  Validator,
} from "../../core/validator";

export class UnionValidator<
  T extends Validator<unknown>[],
  Output = ReturnType<T[number]["parse"]>
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
      value: value as Output,
    };
  }
}
