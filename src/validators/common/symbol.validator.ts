import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";

export interface SymbolValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class SymbolValidator extends Validator<symbol> {
  protected readonly message: (value: unknown) => string;

  constructor(options: SymbolValidatorOptions = {}) {
    super();

    this.message = getErrorMessage(
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
