import {
  BaseArrayValidator,
  ValidationResult,
  Validator,
} from "../../core/validator";
import {
  ArrayLengthValidatorOptions,
  ExactArrayLengthValidator,
  MaxArrayLengthValidator,
  MinArrayLengthValidator,
} from ".";

import { UnknownValidator } from "./unknown.validator";

export type ArrayValidationResult<T> = ValidationResult<T> & {
  index?: number;
};

export class ArrayValidator<
  T extends Validator<any> = UnknownValidator,
  Output = ReturnType<T["parse"]>[]
> extends BaseArrayValidator<Output> {
  private readonly schema: T;

  constructor();
  constructor(schema: T);
  constructor(schema?: T) {
    super();

    if (schema == null) {
      this.schema = new UnknownValidator() as unknown as T;
    } else {
      this.schema = schema;
    }
  }

  parseArraySafe(value: unknown): ArrayValidationResult<Output> {
    if (!Array.isArray(value)) {
      return {
        error: `expected an array but was ${typeof value}`,
      };
    }

    for (let index = 0; index < value.length; index++) {
      const result = this.schema.parseSafe(value[index]);
      if (result.success !== true) {
        return {
          error: result.error,
          index,
        };
      }
    }

    return {
      success: true,
      value: value as any,
    };
  }

  min(
    minLength: number,
    options: ArrayLengthValidatorOptions = {}
  ): MinArrayLengthValidator<T, Output> {
    return new MinArrayLengthValidator(this, minLength, options);
  }

  max(
    maxLength: number,
    options: ArrayLengthValidatorOptions = {}
  ): MaxArrayLengthValidator<T, Output> {
    return new MaxArrayLengthValidator(this, maxLength, options);
  }

  length(
    exactLength: number,
    options: ArrayLengthValidatorOptions = {}
  ): ExactArrayLengthValidator<T, Output> {
    return new ExactArrayLengthValidator(this, exactLength, options);
  }
}
