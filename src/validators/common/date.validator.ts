import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";

export interface DateValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class DateValidator extends Validator<Date> {
  protected readonly message: (value: unknown) => string;

  constructor(options: DateValidatorOptions = {}) {
    super();

    this.message = getErrorMessage(
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
