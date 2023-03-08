import { ValidatorOptions } from "../../core/options";
import { ValidationResult } from "../../core/validator";
import { NumberValidator } from "../common";

export class IntegerValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    options: ValidatorOptions = {}
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
