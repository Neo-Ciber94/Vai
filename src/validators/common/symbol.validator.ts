import {
  ErrorMessage,
  ValidatorOptions,
  getValidationError,
} from "../../core/options";
import { ValidationResult, Validator } from "../../core/validator";

export class SymbolValidator extends Validator<symbol> {
  protected readonly message: ErrorMessage;
  constructor(options: ValidatorOptions = {}) {
    super();

    this.message = getValidationError(
      options.message,
      (v) => `expected symbol but was ${typeof v}`
    );
  }

  parseSafe(value: unknown): ValidationResult<symbol> {
    if (typeof value !== "symbol") {
      return {
        error: this.message(value),
      };
    }

    return { success: true, value };
  }
}
