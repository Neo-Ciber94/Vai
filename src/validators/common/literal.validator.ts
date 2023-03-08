import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";

/**
 * A primitive type.
 */
export type PrimitiveType =
  | string
  | number
  | boolean
  | bigint
  | null
  | undefined;

export type LiteralValidatorOptions = {
  message?: string | ((constant: PrimitiveType, value: unknown) => string);
};

export class LiteralValidator<T extends PrimitiveType> extends Validator<T> {
  private readonly message: (constant: PrimitiveType, value: unknown) => string;

  constructor(
    private readonly constant: T,
    options: LiteralValidatorOptions = {}
  ) {
    super();

    this.message = (constant, value) => {
      return options.message == null
        ? `expected ${constant} but was ${value}`
        : typeof options.message == "string"
        ? options.message
        : options.message(constant, value);
    };
  }

  parseSafe(value: unknown): ValidationResult<T> {
    if (value !== this.constant) {
      return {
        error: this.message(this.constant, value),
      };
    }

    return { success: true, value: this.constant };
  }
}
