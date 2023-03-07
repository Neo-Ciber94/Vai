import { ValidationResult, Validator } from "../../core/validator";

export class UndefinedValidator extends Validator<undefined> {
  parseSafe(value: unknown): ValidationResult<undefined> {
    if (value === undefined) {
      return { success: true, value: undefined };
    }

    return {
      error: "value is not undefined",
    };
  }
}
