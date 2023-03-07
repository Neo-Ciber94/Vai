import { ValidationResult, Validator } from "../../core/validator";

export class AnyValidator extends Validator<any> {
  parseSafe(value: unknown): ValidationResult<any> {
    return { success: true, value };
  }
}
