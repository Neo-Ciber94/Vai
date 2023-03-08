import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  CheckStringValidatorOptions,
  EndsWithStringValidator,
  ExactStringLengthValidator,
  IncludesStringValidator,
  MaxStringLengthValidator,
  MinStringLengthValidator,
  RegexValidator,
  RegexValidatorOptions,
  StartsWithStringValidator,
  StringLengthValidatorOptions,
} from ".";

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
  min(minLength: number, options: StringLengthValidatorOptions = {}) {
    return new MinStringLengthValidator(this, minLength, options);
  }

  /**
   * Checks the parsed string is lower than the max length.
   * @param maxLength The maximum length of the string.
   * @param options The options.
   */
  max(maxLength: number, options: StringLengthValidatorOptions = {}) {
    return new MaxStringLengthValidator(this, maxLength, options);
  }

  /**
   * Checks the parsed string has the given exact length.
   * @param exactLength The length expected from the string.
   * @param options The options.
   */
  length(exactLength: number, options: StringLengthValidatorOptions = {}) {
    return new ExactStringLengthValidator(this, exactLength, options);
  }

  /**
   * After parse checks if the string starts with the given string.
   * @param str The string to use.
   */
  startsWith(str: string, options: CheckStringValidatorOptions = {}) {
    return new StartsWithStringValidator(this, str, options);
  }

  /**
   * After parse checks if the string ends with the given string.
   * @param str The string to use.
   */
  endsWith(str: string, options: CheckStringValidatorOptions = {}) {
    return new EndsWithStringValidator(this, str, options);
  }

  /**
   * After parse checks if the string includes with the given string.
   * @param str The string to use.
   */
  includes(str: string, options: CheckStringValidatorOptions = {}) {
    return new IncludesStringValidator(this, str, options);
  }

  /**
   * Trims the string after parsed.
   */
  trim() {
    // SAFETY: We check anyway for null
    return this.afterParse((x) => (x == null ? x : x.trim()));
  }
}
