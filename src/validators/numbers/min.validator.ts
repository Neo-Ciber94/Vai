import { ValidationResult } from "../../core/validator";
import { NumberValidator } from "../common";

export interface MinValidatorOptions {
  message?: string | ((min: number, value: unknown) => string);
}

export class MinValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    private readonly minValue: number,
    options: MinValidatorOptions = {}
  ) {
    super({
      message(value: unknown) {
        const m = options.message;
        return typeof m === "string"
          ? m
          : typeof m === "function"
          ? m(minValue, value)
          : minErrorFactory(minValue, value);
      },
    });
  }

  override parseSafe(value: unknown): ValidationResult<number> {
    if (typeof value === "number" && value < this.minValue) {
      return {
        error: minErrorFactory(this.minValue, value),
      };
    }

    return this.parent.parseSafe(value);
  }
}

const minErrorFactory = (minValue: number, value: unknown) => {
  return `minimum is ${minValue} but value was ${value}`;
};
