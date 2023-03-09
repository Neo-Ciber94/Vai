import { ValidatorOptions } from "../../core/options";
import { ValidationResult } from "../../core/validator";
import { StringValidator } from "../common";

// length(number)
export class ExactStringLengthValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    private readonly exactLength: number,
    options: ValidatorOptions<string> = {}
  ) {
    super({
      message: (value: unknown) => {
        const m =
          options.message ||
          ((s: string) =>
            `string expected length is ${exactLength} but was ${s.length}`);
        return typeof m === "string" ? m : m(value as string);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    if (result.value.length !== this.exactLength) {
      return {
        error: this.message(value),
      };
    }

    return result;
  }
}

// max(number)
export class MaxStringLengthValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    private readonly maxLength: number,
    options: ValidatorOptions<string> = {}
  ) {
    super({
      message: (value: unknown) => {
        const m =
          options.message ||
          ((s: string) =>
            `string max length is ${maxLength} but was ${s.length}`);
        return typeof m === "string" ? m : m(value as string);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    if (result.value.length > this.maxLength) {
      return {
        error: this.message(value),
      };
    }

    return result;
  }
}

// min(number)
export class MinStringLengthValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    private readonly minLength: number,
    options: ValidatorOptions<string> = {}
  ) {
    super({
      message: (value: unknown) => {
        const m =
          options.message ||
          ((s: string) =>
            `string min length is ${minLength} but was ${s.length}`);
        return typeof m === "string" ? m : m(value as string);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    if (result.value.length < this.minLength) {
      return {
        error: this.message(value),
      };
    }

    return result;
  }
}
