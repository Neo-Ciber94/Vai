import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";

export interface StringValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class StringValidator extends Validator<string> {
  protected readonly message: (value: unknown) => string;

  constructor(options: StringValidatorOptions = {}) {
    super();

    this.message = getErrorMessage(
      options.message,
      (v) => `string number but was ${typeof v}`
    );
  }

  parseSafe(value: unknown): ValidationResult<string> {
    if (typeof value !== "string") {
      return {
        error: this.message(value),
      };
    }

    return { success: true, value };
  }
}
