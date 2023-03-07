import { ValidationResult, Validator } from "../../core/validator";

export class OptionalValidator<
  T extends Validator<unknown>,
  Output = ReturnType<T["parse"]> | undefined
> extends Validator<Output> {
  constructor(private readonly validator: T) {
    super();
  }

  parseSafe(value: unknown): ValidationResult<Output> {
    if (value === undefined) {
      return { success: true, value: undefined! };
    }

    return this.validator.parseSafe(
      value
    ) as unknown as ValidationResult<Output>;
  }
}
