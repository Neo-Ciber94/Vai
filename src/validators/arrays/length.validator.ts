import { ArrayLengthValidatorOptions } from ".";
import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";
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
    this.message = getErrorMessage(
      options.message,
      (v) => `array expected length is ${exactLength} but was ${v.length}`
    );
  }

  parseSafe(value: unknown): ValidationResult<Output> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    if ((result.value as any[]).length !== this.exactLength) {
      return {
        error: this.message(value as any[]),
      };
    }

    return result as ValidationResult<Output>;
  }
}
