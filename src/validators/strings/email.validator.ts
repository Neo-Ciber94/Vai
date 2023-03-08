import { ValidationResult } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { isEmail } from "../../utils/isEmail";
import { StringValidator } from "../common";

export interface EmailStringValidatorOptions {
  message?: string | ((value: string) => string);
}

export class EmailStringValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    options: EmailStringValidatorOptions = {}
  ) {
    super({
      message: getErrorMessage(
        options.message,
        () => `value is no a valid email address`
      ) as (value: unknown) => string,
    });
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);
    if (result.success !== true) {
      return result;
    }

    if (!isEmail(result.value)) {
      return {
        error: this.message(value),
      };
    }

    return result;
  }
}
