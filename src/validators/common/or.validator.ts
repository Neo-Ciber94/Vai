import { ValidationResult, Validator } from "../../core/validator";

export class OrValidator<
  T extends Validator<unknown>,
  U extends Validator<unknown>,
  Output = ReturnType<T["parse"]> | ReturnType<U["parse"]>
> extends Validator<Output> {
  constructor(private readonly left: T, private readonly right: U) {
    super();
  }

  parseSafe(value: unknown): ValidationResult<Output> {
    const leftResult = this.left.parseSafe(value);

    if (leftResult.success === true) {
      return leftResult as unknown as ValidationResult<Output>;
    }

    const rightResult = this.right.parseSafe(value);

    if (rightResult.success === true) {
      return rightResult as unknown as ValidationResult<Output>;
    }

    const leftError = leftResult.error;
    const rightError = rightResult.error;
    return { error: `${leftError} or ${rightError}` };
  }
}
