import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  ExactStringLengthValidator,
  ExactStringLengthValidatorOptions,
  MaxStringLengthValidator,
  MaxStringLengthValidatorOptions,
  MinStringLengthValidator,
  MinStringLengthValidatorOptions,
  RegexValidator,
  RegexValidatorOptions,
} from "../strings";

export interface StringValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class StringValidator extends Validator<string> {
  protected readonly message: (value: unknown) => string;

  constructor(options: StringValidatorOptions = {}) {
    super();

    this.message = getErrorMessage(
      options.message,
      (v) => `expected string but was ${typeof v}`
    );
  }

  parseSafe(value: unknown): ValidationResult<string> {
    if (typeof value !== "string") {
      return {
        error: this.message(value),
      };
    }

    return { success: true, value };
  }

  /**
   * Matches the parsed string with the given expression.
   * @param regex The regex used to match the string.
   * @param options The options.
   */
  regex(regex: RegExp, options: RegexValidatorOptions = {}) {
    return new RegexValidator(this, regex, options);
  }

  /**
   * Checks the parsed string is greater than the min length.
   * @param minLength The minimum length of the string.
   * @param options The options.
   */
  min(minLength: number, options: MinStringLengthValidatorOptions = {}) {
    return new MinStringLengthValidator(this, minLength, options);
  }

  /**
   * Checks the parsed string is lower than the max length.
   * @param maxLength The maximum length of the string.
   * @param options The options.
   */
  max(maxLength: number, options: MaxStringLengthValidatorOptions = {}) {
    return new MaxStringLengthValidator(this, maxLength, options);
  }

  /**
   * Checks the parsed string has the given exact length.
   * @param exactLength The length expected from the string.
   * @param options The options.
   */
  length(exactLength: number, options: ExactStringLengthValidatorOptions = {}) {
    return new ExactStringLengthValidator(this, exactLength, options);
  }
}
