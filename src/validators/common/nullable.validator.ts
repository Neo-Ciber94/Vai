import { ValidationResult, Validator } from "../../core/validator";

export class NullableValidator<
  T extends Validator<any>,
  Output = ReturnType<T["parse"]> | null
> extends Validator<Output> {
  constructor(private readonly validator: T) {
    super();
  }

  parseSafe(value: unknown): ValidationResult<Output> {
    if (value === null) {
      return { success: true, value: null! };
    }

    return this.validator.parseSafe(
      value
    ) as unknown as ValidationResult<Output>;
  }
}
