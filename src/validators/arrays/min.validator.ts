import { ArrayLengthValidatorOptions } from ".";
import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { AnyValidator, ArrayValidator, UnknownValidator } from "../common";

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
    this.message = getErrorMessage(
      options.message,
      (v) => `array min length is ${minLength} but was ${v.length}`
    );
  }

  parseSafe(value: unknown): ValidationResult<Output> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    if ((result.value as any[]).length < this.minLength) {
      return {
        error: this.message(value as any[]),
      };
    }

    return result as ValidationResult<Output>;
  }
}
