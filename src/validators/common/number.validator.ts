import { ValidationResult, Validator } from "../../core/validator";
import {
  MinValidator,
  MinValidatorOptions,
  IntegerValidator,
  MaxValidator,
  MaxValidatorOptions,
} from ".";
import {
  ErrorMessage,
  ValidatorOptions,
  getValidationError,
} from "../../core/options";

export class NumberValidator extends Validator<number> {
  protected readonly message: ErrorMessage;
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

  min(minValue: number, options: MinValidatorOptions = {}): MinValidator {
    return new MinValidator(this, minValue, options);
  }

  max(maxValue: number, options: MaxValidatorOptions = {}): MaxValidator {
    return new MaxValidator(this, maxValue, options);
  }
}
