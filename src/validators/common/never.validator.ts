/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidationResult, Validator } from "../../core/validator";

export class NeverValidator extends Validator<never> {
  parseSafe(_: unknown): ValidationResult<never> {
    return {
      error: "never",
    };
  }
}
