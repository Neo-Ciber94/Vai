import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";

export interface BigIntValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class BigIntValidator extends Validator<bigint> {
  protected readonly message: (value: unknown) => string;

  constructor(options: BigIntValidatorOptions = {}) {
    super();

    this.message = getErrorMessage(
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
