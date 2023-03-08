import { ValidationResult } from "../../core/validator";
import { StringValidator } from "../common";

export interface MaxStringLengthValidatorOptions {
  message?: string | ((value: string) => string);
}

export class MaxStringLengthValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    private readonly maxLength: number,
    options: MaxStringLengthValidatorOptions = {}
  ) {
    super({
      message: (value: unknown) => {
        const m =
          options.message ||
          ((s: string) =>
            `string max length is ${maxLength} but was ${s.length}`);
        return typeof m === "string" ? m : m(value as string);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    if (result.value.length > this.maxLength) {
      return {
        error: this.message(value),
      };
    }

    return result;
  }
}
