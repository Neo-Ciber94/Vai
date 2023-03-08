import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";

export interface EnumValidatorOptions {
  message?: string | ((value: unknown) => string);
}

/**
 * Allowed types for `Vai` enum validator.
 */
export type ValidEnumType = string | number | bigint;

export class EnumValidator<
  T extends ValidEnumType,
  U extends Readonly<[T, ...T[]]>
> extends Validator<U> {
  protected readonly message: (value: unknown) => string;

  constructor(private readonly values: U, options: EnumValidatorOptions = {}) {
    super();

    this.message = getErrorMessage(
      options.message,
      (v) => `expected a valid enum value but was ${typeof v}`
    );
  }

  parseSafe(value: unknown): ValidationResult<U> {
    for (const obj of this.values) {
      if (obj === value) {
        return {
          success: true,
          value: value as U,
        };
      }
    }

    return {
      error: this.message(value),
    };
  }
}
