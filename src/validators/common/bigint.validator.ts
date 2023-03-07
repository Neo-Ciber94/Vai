import { ValidationResult, Validator } from "../../core/validator";

export interface BigIntValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class BigIntValidator extends Validator<bigint> {
  protected readonly message: (value: unknown) => string;

  constructor(options: BigIntValidatorOptions = {}) {
    super();

    const message = options.message;

    if (message == null) {
      this.message = numberErrorFactory;
    } else if (typeof message === "string") {
      this.message = () => message;
    } else if (typeof message === "function") {
      this.message = message;
    } else {
      throw new Error("invalid message type: " + typeof message);
    }
  }

  parseSafe(value: unknown): ValidationResult<bigint> {
    if (typeof value !== "bigint") {
      return {
        error: this.message(value),
      };
    }

    return { success: true, value };
  }
}

const numberErrorFactory = (value: unknown) => {
  return `expected bigint but was ${typeof value}`;
};
