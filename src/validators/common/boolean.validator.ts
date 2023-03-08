import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";

export interface BooleanValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class BooleanValidator extends Validator<boolean> {
  protected readonly message: (value: unknown) => string;

  constructor(options: BooleanValidatorOptions = {}) {
    super();

    const message = options.message;

    this.message = getErrorMessage(
      options.message,
      (v) => `boolean bigint but was ${typeof v}`
    );
  }

  parseSafe(value: unknown): ValidationResult<boolean> {
    if (typeof value !== "boolean") {
      return {
        error: this.message(value),
      };
    }

    return { value, success: true };
  }
}
