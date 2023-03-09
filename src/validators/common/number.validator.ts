import { ValidationResult, Validator } from "../../core/validator";
import {
  EvenNumberValidator,
  FiniteNumberValidator,
  GreaterOrEqualThanNumberValidator,
  GreaterThanNumberValidator,
  IntegerValidator,
  LowerOrEqualThanNumberValidator,
  LowerThanNumberValidator,
  MaxNumberValidator,
  MinNumberValidator,
  NegativeNumberValidator,
  NonZeroNumberValidator,
  OddNumberValidator,
  PositiveNumberValidator,
  SafeNumberValidator,
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

  /**
   * Checks if the number is an integer.
   * @param options The options
   */
  integer(options: ValidatorOptions = {}): IntegerValidator {
    return new IntegerValidator(this, options);
  }

  /**
   * Checks if the number is greater than the minimum value.
   * @param minValue The minimum value.
   * @param options The options.
   */
  min(
    minValue: number,
    options: ValidatorComparisonOptions = {}
  ): MinNumberValidator {
    return new MinNumberValidator(this, minValue, options);
  }

  /**
   * Checks if the number is lower than the maximum value.
   * @param maxValue The maximum value.
   * @param options The options.
   */
  max(
    maxValue: number,
    options: ValidatorComparisonOptions = {}
  ): MaxNumberValidator {
    return new MaxNumberValidator(this, maxValue, options);
  }

  /**
   * Checks the number is greater than the specified value.
   * @param other The other value.
   * @param options The options.
   */
  gt(
    other: number,
    options: ValidatorComparisonOptions = {}
  ): GreaterThanNumberValidator {
    return new GreaterThanNumberValidator(this, other, options);
  }

  /**
   * Checks the number is lower than the specified value.
   * @param other The other value.
   * @param options The options.
   */
  lt(
    other: number,
    options: ValidatorComparisonOptions = {}
  ): LowerThanNumberValidator {
    return new LowerThanNumberValidator(this, other, options);
  }

  /**
   * Checks the number is greater or equals than the specified value.
   * @param other The other value.
   * @param options The options.
   */
  gte(
    other: number,
    options: ValidatorComparisonOptions = {}
  ): GreaterOrEqualThanNumberValidator {
    return new GreaterOrEqualThanNumberValidator(this, other, options);
  }

  /**
   * Checks the number is lower or equals than the specified value.
   * @param other The other value.
   * @param options The options.
   */
  lte(
    other: number,
    options: ValidatorComparisonOptions = {}
  ): LowerOrEqualThanNumberValidator {
    return new LowerOrEqualThanNumberValidator(this, other, options);
  }

  /**
   * Checks the number is positive.
   * @param options The options.
   */
  positive(options: ValidatorOptions = {}): PositiveNumberValidator {
    return new PositiveNumberValidator(this, options);
  }

  /**
   * Checks the number is negative.
   * @param options The options.
   */
  negative(options: ValidatorOptions = {}): NegativeNumberValidator {
    return new NegativeNumberValidator(this, options);
  }

  /**
   * Checks the number is not zero.
   * @param options The options.
   */
  nonzero(options: ValidatorOptions = {}) {
    return new NonZeroNumberValidator(this, options);
  }

  /**
   * Checks the number is within the safe integer range.
   * @see `Number.isSafeInteger`
   * @param options The options.
   */
  safe(options: ValidatorOptions = {}) {
    return new SafeNumberValidator(this, options);
  }

  /**
   * Checks the number is no infinite.
   * @see `Number.isFinite`
   * @param options The options.
   */
  finite(options: ValidatorOptions = {}) {
    return new FiniteNumberValidator(this, options);
  }

  /**
   * Checks the number is even.
   * @param options The options.
   */
  even(options: ValidatorOptions = {}) {
    return new EvenNumberValidator(this, options);
  }

  /**
   * Checks the number is odd.
   * @param options The options.
   */
  odd(options: ValidatorOptions = {}) {
    return new OddNumberValidator(this, options);
  }
}
