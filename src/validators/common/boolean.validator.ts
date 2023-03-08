import {
  ErrorMessage,
  ValidatorOptions,
  getValidationError,
} from "../../core/options";
import { ValidationResult, Validator } from "../../core/validator";

export class BooleanValidator extends Validator<boolean> {
  protected readonly message: ErrorMessage;

  constructor(options: ValidatorOptions = {}) {
    super();

    this.message = getValidationError(
      options.message,
      (v) => `expected boolean but was ${typeof v}`
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
