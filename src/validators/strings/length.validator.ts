import { ValidationResult } from "../../core/validator";
import { StringValidator } from "../common";

export interface ExactStringLengthValidatorOptions {
  message?: string | ((value: string) => string);
}

export class ExactStringLengthValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    private readonly length: number,
    options: ExactStringLengthValidatorOptions = {}
  ) {
    super({
      message: (value: unknown) => {
        const m =
          options.message ||
          ((s: string) =>
            `string expected length is ${length} but was ${s.length}`);
        return typeof m === "string" ? m : m(value as string);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    if (result.value.length !== this.length) {
      return {
        error: this.message(value),
      };
    }

    return result;
  }
}
