import { ValidationResult, Validator } from "../../core/validator";
import {
  GreaterOrEqualThanNumberValidator,
  GreaterThanNumberValidator,
  IntegerValidator,
  LowerOrEqualThanNumberValidator,
  LowerThanNumberValidator,
  MaxNumberValidator,
  MinNumberValidator,
  NegativeNumberValidator,
  PositiveNumberValidator,
  ValidatorComparisonOptions,
} from ".";
import {
  GetMessage,
  ValidatorOptions,
  getValidationError,
} from "../../core/options";

export class NumberValidator extends Validator<number> {
  protected readonly message: GetMessage;
  constructor(options: ValidatorOptions = {}) {
    super();

    this.message = getValidationError(
      options.message,
      (v) => `expected number but was ${typeof v}`
    );
  }

  parseSafe(value: unknown): ValidationResult<number> {
    if (typeof value !== "number" || Number.isNaN(value)) {
      return {
        error: this.message(value),
      };
    }

    return { success: true, value };
  }

  integer(options: ValidatorOptions = {}): IntegerValidator {
    return new IntegerValidator(this, options);
  }

  min(
    minValue: number,
    options: ValidatorComparisonOptions = {}
  ): MinNumberValidator {
    return new MinNumberValidator(this, minValue, options);
  }

  max(
    maxValue: number,
    options: ValidatorComparisonOptions = {}
  ): MaxNumberValidator {
    return new MaxNumberValidator(this, maxValue, options);
  }

  gt(
    other: number,
    options: ValidatorComparisonOptions = {}
  ): GreaterThanNumberValidator {
    return new GreaterThanNumberValidator(this, other, options);
  }

  lt(
    other: number,
    options: ValidatorComparisonOptions = {}
  ): LowerThanNumberValidator {
    return new LowerThanNumberValidator(this, other, options);
  }

  gte(
    other: number,
    options: ValidatorComparisonOptions = {}
  ): GreaterOrEqualThanNumberValidator {
    return new GreaterOrEqualThanNumberValidator(this, other, options);
  }

  lte(
    other: number,
    options: ValidatorComparisonOptions = {}
  ): LowerOrEqualThanNumberValidator {
    return new LowerOrEqualThanNumberValidator(this, other, options);
  }

  positive(options: ValidatorOptions = {}): PositiveNumberValidator {
    return new PositiveNumberValidator(this, options);
  }

  negative(options: ValidatorOptions = {}): NegativeNumberValidator {
    return new NegativeNumberValidator(this, options);
  }
}
