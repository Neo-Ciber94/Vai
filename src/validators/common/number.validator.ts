import { ValidationResult, Validator } from "../../core/validator";

export interface NumberValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class NumberValidator extends Validator<number> {
  private readonly message: (value: unknown) => string;

  constructor(options: NumberValidatorOptions = {}) {
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

  parseSafe(value: unknown): ValidationResult<number> {
    if (typeof value !== "number") {
      return {
        error: this.message(value),
      };
    }

    return { success: true, value };
  }
}

const numberErrorFactory = (value: unknown) => {
  return `expected number but was ${typeof value}`;
};
