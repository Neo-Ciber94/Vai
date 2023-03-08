import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";

export interface EnumValidatorOptions {
  message?: string | ((value: unknown) => string);
}

/**
 * Allowed types for `Vai` enum validator.
 */
export type ValidEnumType = string | number | bigint;

/**
 * Returns the keys of an enum.
 */
export type EnumKeys<T extends readonly any[]> = T[number];

export class EnumValidator<
  U extends ValidEnumType,
  T extends Readonly<[U, ...U[]]>,
  Output = EnumKeys<T>
> extends Validator<Output> {
  protected readonly message: (value: unknown) => string;

  constructor(private readonly values: T, options: EnumValidatorOptions = {}) {
    super();

    this.message = getErrorMessage(
      options.message,
      (v) => `expected a valid enum value but was ${typeof v}`
    );
  }

  parseSafe(value: unknown): ValidationResult<Output> {
    for (const obj of this.values) {
      if (obj === value) {
        return {
          success: true,
          value: value as Output,
        };
      }
    }

    return {
      error: this.message(value),
    };
  }
}
