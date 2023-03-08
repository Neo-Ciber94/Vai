import { ValidationResult } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { StringValidator } from "../common";

export type CheckStringValidatorOptions = {
  message?: string | ((value: string) => string);
};

export class StartsWithStringValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    private readonly s: string,
    options: CheckStringValidatorOptions = {}
  ) {
    super({
      message: getErrorMessage(
        options.message,
        () => `string doesn't starts with "${s}"`
      ) as (value: unknown) => string,
    });
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);
    if (result.success !== true) {
      return result;
    }

    if (!result.value.startsWith(this.s)) {
      return {
        error: this.message(value),
      };
    }

    return result;
  }
}

export class EndsWithStringValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    private readonly s: string,
    options: CheckStringValidatorOptions = {}
  ) {
    super({
      message: getErrorMessage(
        options.message,
        () => `string doesn't ends with "${s}"`
      ) as (value: unknown) => string,
    });
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);
    if (result.success !== true) {
      return result;
    }

    if (!result.value.endsWith(this.s)) {
      return {
        error: this.message(value),
      };
    }

    return result;
  }
}

export class IncludesStringValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    private readonly s: string,
    options: CheckStringValidatorOptions = {}
  ) {
    super({
      message: getErrorMessage(
        options.message,
        () => `string doesn't includes "${s}"`
      ) as (value: unknown) => string,
    });
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);
    if (result.success !== true) {
      return result;
    }

    if (!result.value.includes(this.s)) {
      return {
        error: this.message(value),
      };
    }

    return result;
  }
}
