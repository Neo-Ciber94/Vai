import { ValidationResult, Validator } from "../../core/validator";

export interface DateValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class DateValidator extends Validator<Date> {
  protected readonly message: (value: unknown) => string;

  constructor(options: DateValidatorOptions = {}) {
    super();

    const message = options.message;

    if (message == null) {
      this.message = dateErrorFactory;
    } else if (typeof message === "string") {
      this.message = () => message;
    } else if (typeof message === "function") {
      this.message = message;
    } else {
      throw new Error("invalid message type: " + typeof message);
    }
  }

  parseSafe(value: unknown): ValidationResult<Date> {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      return {
        error: this.message(value),
      };
    }

    return { success: true, value };
  }
}

const dateErrorFactory = (value: unknown) => {
  return `expected date but was ${typeof value}`;
};
