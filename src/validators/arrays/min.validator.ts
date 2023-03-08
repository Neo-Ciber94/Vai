import { ArrayLengthValidatorOptions } from ".";
import { getValidationError } from "../../core/options";
import { ValidationResult, Validator } from "../../core/validator";
import { AnyValidator, ArrayValidator } from "../common";

export class MinArrayLengthValidator<
  T extends Validator<any> = AnyValidator,
  Output = ReturnType<T["parse"]>[]
> extends ArrayValidator<T, Output> {
  private readonly message: (value: any[]) => string;

  constructor(
    private readonly parent: ArrayValidator<T, Output>,
    private readonly minLength: number,
    options: ArrayLengthValidatorOptions = {}
  ) {
    super();
    this.message = getValidationError(
      options.message,
      (v) => `array min length is ${minLength} but was ${v.length}`
    );
  }

  parseSafe(value: unknown): ValidationResult<Output> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    const arr = result.value as unknown as unknown[];
    if (arr.length < this.minLength) {
      return {
        error: this.message(value as any[]),
      };
    }

    return result as ValidationResult<Output>;
  }
}
