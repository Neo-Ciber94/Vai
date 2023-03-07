import { ValidationResult } from "../../core/validator";
import { NumberValidator } from "../common";

export interface IntegerValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class IntegerValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    options: IntegerValidatorOptions = {}
  ) {
    super({
      message: options.message || integerErrorFactory,
    });
  }

  override parseSafe(value: unknown): ValidationResult<number> {
    if (!Number.isInteger(value)) {
      return {
        error: this.message(value),
      };
    }

    return this.parent.parseSafe(value);
  }
}

const integerErrorFactory = (value: unknown) => {
  return `expected integer but was ${typeof value}`;
};
