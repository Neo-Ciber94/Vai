import { ValidationResult, Validator } from "../../core/validator";
import {
  MinValidator,
  IntegerValidatorOptions,
  MinValidatorOptions,
  IntegerValidator,
  MaxValidator,
  MaxValidatorOptions,
} from ".";
import { getErrorMessage } from "../../utils/getErrorMessage";

export interface NumberValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class NumberValidator extends Validator<number> {
  protected readonly message: (value: unknown) => string;

  constructor(options: NumberValidatorOptions = {}) {
    super();

    this.message = getErrorMessage(
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

  integer(options: IntegerValidatorOptions = {}): IntegerValidator {
    return new IntegerValidator(this, options);
  }

  min(minValue: number, options: MinValidatorOptions = {}): MinValidator {
    return new MinValidator(this, minValue, options);
  }

  max(maxValue: number, options: MaxValidatorOptions = {}): MaxValidator {
    return new MaxValidator(this, maxValue, options);
  }
}
