import {
  ErrorMessage,
  ValidatorOptions,
  getValidationError,
} from "../../core/options";
import { ValidationResult, Validator } from "../../core/validator";

export class BigIntValidator extends Validator<bigint> {
  protected readonly message: ErrorMessage;

  constructor(options: ValidatorOptions = {}) {
    super();

    this.message = getValidationError(
      options.message,
      (v) => `expected bigint but was ${typeof v}`
    );
  }

  parseSafe(value: unknown): ValidationResult<bigint> {
    if (typeof value !== "bigint") {
      return {
        error: this.message(value),
      };
    }

    return { success: true, value };
  }
}
