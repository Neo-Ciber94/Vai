import { ValidationResult, Validator } from "../../core/validator";

export interface SymbolValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class SymbolValidator extends Validator<symbol> {
  protected readonly message: (value: unknown) => string;

  constructor(options: SymbolValidatorOptions = {}) {
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

  parseSafe(value: unknown): ValidationResult<symbol> {
    if (typeof value !== "symbol") {
      return {
        error: this.message(value),
      };
    }

    return { success: true, value };
  }
}

const stringErrorFactory = (value: unknown) => {
  return `expected symbol but was ${typeof value}`;
};
