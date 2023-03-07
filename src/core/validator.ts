import {
  NullableValidator,
  OptionalValidator,
  OrValidator,
} from "../validators/common";
import { VaiError } from "./error";

/**
 * A successful validation.
 */
type ValidationSuccess<T> = {
  /**
   * The value after validation.
   */
  value: T;

  /**
   * Validation succeeded.
   */
  success: true;
};

/**
 * A validation that failed.
 */
type ValidationFailed = {
  /**
   * The error that ocurred during the validation.
   */
  error: string;
  success?: never;
};

/**
 * The result of a validation.
 */
export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailed;

/**
 * The result of a validation of an array.
 */
export type ArrayValidationResult<T> = ValidationResult<T> & {
  /**
   * The index of the failure.
   */
  index?: number;
};

/**
 * Base class for all validators.
 */
export abstract class Validator<T> {
  /**
   * Checks if the given type is valid.
   * @param value The value to parse.
   * @returns An object containing the value if the validation succeeded, otherwise
   * or an object containing the error message.
   */
  abstract parseSafe(value: unknown): ValidationResult<T>;

  /**
   * Validates the given type and returns `true` if is valid.
   * @param value The value to validate.
   * @returns `true` if the value is valid, `false` otherwise.
   */
  isValid(value: unknown): value is T {
    return this.parseSafe(value).success === true;
  }

  /**
   * Parses the given value and throws an exception if fails.
   * @param value The value to validate.
   * @returns The resulting value.
   */
  parse(value: unknown): T {
    const result = this.parseSafe(value);

    if (result.success === true) {
      return result.value;
    }

    throw new VaiError(result.error);
  }

  /**
   * Parses the given value and return the default value if fails.
   * @param value The value to parse.
   * @param defaultValue The default value in case the value is invalid.
   * @returns The parsed value or the default value.
   */
  parseOrDefault(value: unknown, defaultValue: T | (() => T)): T {
    const result = this.parseSafe(value);

    if (result.success === true) {
      return result.value;
    } else {
      if (typeof defaultValue === "function") {
        const f = defaultValue as () => T;
        return f();
      } else {
        return defaultValue;
      }
    }
  }

  /**
   * Allows to accept values as `null`.
   */
  nullable(): NullableValidator<this> {
    return new NullableValidator(this);
  }

  /**
   * Allows to accept values as `undefined`.
   */
  optional(): OptionalValidator<this> {
    return new OptionalValidator(this);
  }

  /**
   * Combines two validators.
   */
  or<U extends Validator<unknown>>(validator: U): OrValidator<this, U> {
    return new OrValidator(this, validator);
  }
}

/**
 * Base class for array validators.
 */
export abstract class BaseArrayValidator<T> extends Validator<T> {
  parseSafe(value: unknown): ValidationResult<T> {
    const result = this.parseArraySafe(value);

    if (result.success === true) {
      return result;
    }

    const error = `index ${result.index}, ${result.error}`;
    return { error };
  }

  /**
   * Validates the values of an array.
   * @param value The array to validate.
   */
  abstract parseArraySafe(value: unknown): ArrayValidationResult<T>;
}
