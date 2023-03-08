import { ValidationResult, Validator } from "../../core/validator";

export class BeforeValidator<V extends Validator<T>, T> extends Validator<T> {
  constructor(
    private readonly parent: V,
    private readonly mapper: (value: any) => unknown
  ) {
    super();
  }

  parseSafe(value: unknown): ValidationResult<T> {
    const newValue = this.mapper(value);
    return this.parent.parseSafe(newValue);
  }
}

export class AfterValidator<V extends Validator<T>, T, R> extends Validator<R> {
  constructor(
    private readonly parent: V,
    private readonly mapper: (value: T) => R
  ) {
    super();
  }

  parseSafe(value: unknown): ValidationResult<R> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    return {
      success: true,
      value: this.mapper(result.value),
    };
  }
}
