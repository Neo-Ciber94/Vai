import { ValidationResult, Validator } from "../../core/validator";

export class NullValidator extends Validator<null> {
  parseSafe(value: unknown): ValidationResult<null> {
    if (value === null) {
      return { success: true, value: null };
    }

    return {
      error: "value is not null",
    };
  }
}
