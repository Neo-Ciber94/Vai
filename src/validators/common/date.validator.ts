import {
  ErrorMessage,
  ValidatorOptions,
  getValidationError,
} from "../../core/options";
import { ValidationResult, Validator } from "../../core/validator";

export class DateValidator extends Validator<Date> {
  protected readonly message: ErrorMessage;

  constructor(options: ValidatorOptions = {}) {
    super();

    this.message = getValidationError(
      options.message,
      (v) => `expected Date but was ${typeof v}`
    );
  }

  parseSafe(value: unknown): ValidationResult<Date> {
    let date = value;

    if (typeof value === "string") {
      date = new Date(value);
    }

    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      return {
        error: this.message(date),
      };
    }

    return { success: true, value: date };
  }
}
