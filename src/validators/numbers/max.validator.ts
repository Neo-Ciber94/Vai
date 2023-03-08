import { ValidationResult } from "../../core/validator";
import { NumberValidator } from "../common";

export interface MaxValidatorOptions {
  message?: string | ((min: number, value: unknown) => string);
}

export class MaxValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    private readonly maxValue: number,
    options: MaxValidatorOptions = {}
  ) {
    super({
      message(value: unknown) {
        const m = options.message;
        return typeof m === "string"
          ? m
          : typeof m === "function"
          ? m(maxValue, value)
          : maxErrorFactory(maxValue, value);
      },
    });
  }

  override parseSafe(value: unknown): ValidationResult<number> {
    if (typeof value === "number" && value > this.maxValue) {
      return {
        error: maxErrorFactory(this.maxValue, value),
      };
    }

    return this.parent.parseSafe(value);
  }
}

const maxErrorFactory = (maxValue: number, value: unknown) => {
  return `maximum is ${maxValue} but value was ${value}`;
};
