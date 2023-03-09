import { ValidationResult, Validator } from "../../core/validator";

export class NanValidator extends Validator<unknown> {
  parseSafe(value: unknown): ValidationResult<unknown> {
    if (typeof value === "number" && !Number.isNaN(value)) {
      return {
        error: "value is a number",
      };
    }

    return { success: true, value };
  }
}
