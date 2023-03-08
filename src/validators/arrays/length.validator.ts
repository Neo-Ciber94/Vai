import { ArrayLengthValidatorOptions } from ".";
import { getValidationError } from "../../core/options";
import { ValidationResult, Validator } from "../../core/validator";
import { ArrayValidator, UnknownValidator } from "../common";

export class ExactArrayLengthValidator<
  T extends Validator<any> = UnknownValidator,
  Output = ReturnType<T["parse"]>[]
> extends ArrayValidator<T, Output> {
  private readonly message: (value: any[]) => string;

  constructor(
    private readonly parent: ArrayValidator<T, Output>,
    private readonly exactLength: number,
    options: ArrayLengthValidatorOptions = {}
  ) {
    super();
    this.message = getValidationError(
      options.message,
      (v) => `array expected length is ${exactLength} but was ${v.length}`
    );
  }

  parseSafe(value: unknown): ValidationResult<Output> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    const arr = result.value as unknown as unknown[];
    if (arr.length !== this.exactLength) {
      return {
        error: this.message(value as any[]),
      };
    }

    return result as ValidationResult<Output>;
  }
}
