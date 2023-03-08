import { ValidationResult } from "../../core/validator";
import { StringValidator } from "../common";

export interface MinStringLengthValidatorOptions {
  message?: string | ((value: string) => string);
}

export class MinStringLengthValidator extends StringValidator {
  constructor(
    private readonly parent: StringValidator,
    private readonly minLength: number,
    options: MinStringLengthValidatorOptions = {}
  ) {
    super({
      message: (value: unknown) => {
        const m =
          options.message ||
          ((s: string) =>
            `string min length is ${minLength} but was ${s.length}`);
        return typeof m === "string" ? m : m(value as string);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    if (result.value.length < this.minLength) {
      return {
        error: this.message(value),
      };
    }

    return result;
  }
}
