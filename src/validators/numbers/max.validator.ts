import { ValidationResult } from "../../core/validator";
import { NumberValidator } from "../common";

export interface MaxValidatorOptions {
  message?: string | ((min: number, value: unknown) => string);
}

export class MaxValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    private readonly minValue: number,
    options: MaxValidatorOptions = {}
  ) {
    super({
      message(value: unknown) {
        const m = options.message;
        return typeof m === "string"
          ? m
          : typeof m === "function"
          ? m(minValue, value)
          : maxErrorFactory(minValue, value);
      },
    });
  }

  override parseSafe(value: unknown): ValidationResult<number> {
    if (typeof value === "number" && value > this.minValue) {
      return {
        error: maxErrorFactory(this.minValue, value),
      };
    }

    return this.parent.parseSafe(value);
  }
}

const maxErrorFactory = (minValue: number, value: unknown) => {
  return `maximum is ${minValue} but value was ${value}`;
};
