import { ValidationResult, Validator } from "../../core/validator";

export class UnknownValidator extends Validator<unknown> {
  parseSafe(value: unknown): ValidationResult<unknown> {
    return { success: true, value };
  }
}
