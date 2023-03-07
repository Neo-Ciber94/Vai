import { ValidationResult, Validator } from "../../core/validator";

export interface StringValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class StringValidator extends Validator<string> {
  private readonly message: (value: unknown) => string;

  constructor(options: StringValidatorOptions = {}) {
    super();

    const message = options.message;

    if (message == null) {
      this.message = stringErrorFactory;
    } else if (typeof message === "string") {
      this.message = () => message;
    } else if (typeof message === "function") {
      this.message = message;
    } else {
      throw new Error("invalid message type: " + typeof message);
    }
  }

  parseSafe(value: unknown): ValidationResult<string> {
    if (typeof value !== "string") {
      return {
        error: this.message(value),
      };
    }

    return { success: true, value };
  }
}

const stringErrorFactory = (value: unknown) => {
  return `expected string but was ${typeof value}`;
};
