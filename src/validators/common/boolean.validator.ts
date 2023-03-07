import { ValidationResult, Validator } from "../../core/validator";

export interface BooleanValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class BooleanValidator extends Validator<boolean> {
  private readonly message: (value: unknown) => string;

  constructor(options: BooleanValidatorOptions = {}) {
    super();

    const message = options.message;

    if (message == null) {
      this.message = booleanErrorFactory;
    } else if (typeof message === "string") {
      this.message = () => message;
    } else if (typeof message === "function") {
      this.message = message;
    } else {
      throw new Error("invalid message type: " + typeof message);
    }
  }

  parseSafe(value: unknown): ValidationResult<boolean> {
    if (typeof value !== "boolean") {
      return {
        error: this.message(value),
      };
    }

    return { value, success: true };
  }
}

const booleanErrorFactory = (value: unknown) => {
  return `expected boolean but was ${typeof value}`;
};
