import { ValidatorOptions, getValidationError } from "../../core/options";
import { ValidationResult } from "../../core/validator";
import { isEmail } from "../../utils/isEmail";
import { StringValidator } from "../common";

export class EmailStringValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    options: ValidatorOptions<string> = {}
  ) {
    super({
      message: getValidationError(
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
