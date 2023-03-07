import { ValidationResult, Validator } from "../../core/validator";

/**
 * A primitive type.
 */
export type PrimitiveType = string | number | boolean | bigint | null | undefined;

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

    const message = options.message;

    if (message == null) {
      this.message = errorFactory;
    } else if (typeof message === "string") {
      this.message = () => message;
    } else if (typeof message === "function") {
      this.message = message;
    } else {
      throw new Error("invalid message type: " + typeof message);
    }
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

const errorFactory = (constant: PrimitiveType, value: unknown) => {
  return `expected ${constant} but was ${value}`;
};
