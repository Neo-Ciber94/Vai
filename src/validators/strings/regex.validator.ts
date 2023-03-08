import { ValidationResult } from "../../core/validator";
import { StringValidator } from "../common";

export interface RegexValidatorOptions {
  message?: string | ((value: string) => string);
}

export class RegexValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    private readonly expr: RegExp,
    options: RegexValidatorOptions = {}
  ) {
    super({
      message: (value: unknown) => {
        const m =
          options.message ||
          (() => `string doesn't match the expression: ${expr.toString()}`);
        return typeof m === "string" ? m : m(value as string);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    if (!this.expr.test(result.value)) {
      return {
        error: this.message(value),
      };
    }

    return result;
  }
}
