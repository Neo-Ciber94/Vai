import { ValidationResult, Validator } from "../../core/validator";
import {
  EmailStringValidator,
  EndsWithStringValidator,
  ExactStringLengthValidator,
  IncludesStringValidator,
  LowerCaseStringValidator,
  MaxStringLengthValidator,
  MinStringLengthValidator,
  RegexValidator,
  StartsWithStringValidator,
  TrimStringValidator,
  UpperCaseStringValidator,
} from ".";
import {
  ErrorMessage,
  ValidatorOptions,
  getValidationError,
} from "../../core/options";

export class StringValidator extends Validator<string> {
  protected readonly message: ErrorMessage;
  constructor(options: ValidatorOptions = {}) {
    super();

    this.message = getValidationError(
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
   * Checks if the parsed string is a valid email address.
   * @param options The options.
   */
  email(options: ValidatorOptions = {}) {
    return new EmailStringValidator(this, options);
  }

  /**
   * Matches the parsed string with the given expression.
   * @param regex The regex used to match the string.
   * @param options The options.
   */
  regex(regex: RegExp, options: ValidatorOptions = {}) {
    return new RegexValidator(this, regex, options);
  }

  /**
   * Checks the parsed string is greater than the min length.
   * @param minLength The minimum length of the string.
   * @param options The options.
   */
  min(minLength: number, options: ValidatorOptions = {}) {
    return new MinStringLengthValidator(this, minLength, options);
  }

  /**
   * Checks the parsed string is lower than the max length.
   * @param maxLength The maximum length of the string.
   * @param options The options.
   */
  max(maxLength: number, options: ValidatorOptions = {}) {
    return new MaxStringLengthValidator(this, maxLength, options);
  }

  /**
   * Checks the parsed string has the given exact length.
   * @param exactLength The length expected from the string.
   * @param options The options.
   */
  length(exactLength: number, options: ValidatorOptions = {}) {
    return new ExactStringLengthValidator(this, exactLength, options);
  }

  /**
   * After parse checks if the string starts with the given string.
   * @param str The string to use.
   */
  startsWith(str: string, options: ValidatorOptions = {}) {
    return new StartsWithStringValidator(this, str, options);
  }

  /**
   * After parse checks if the string ends with the given string.
   * @param str The string to use.
   */
  endsWith(str: string, options: ValidatorOptions = {}) {
    return new EndsWithStringValidator(this, str, options);
  }

  /**
   * After parse checks if the string includes with the given string.
   * @param str The string to use.
   */
  includes(str: string, options: ValidatorOptions = {}) {
    return new IncludesStringValidator(this, str, options);
  }

  /**
   * Trims the string after parsed.
   */
  trim() {
    return new TrimStringValidator(this);
  }

  /**
   * Converts this string to lowercase after parsed.
   */
  toLowerCase() {
    return new LowerCaseStringValidator(this);
  }

  /**
   * Converts this string to uppercase after parsed.
   */
  toUpperCase() {
    return new UpperCaseStringValidator(this);
  }
}
