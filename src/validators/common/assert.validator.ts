import { getValidationError } from "../../core/options";
import { ValidationResult, Validator } from "../../core/validator";

export interface AssertValidatorOptions<T> {
  condition: (value: T) => boolean;
  message?: string | ((value: T) => string);
}

export class AssertValidator<T> extends Validator<T> {
  private readonly condition: (value: T) => boolean;
  private readonly getMessage: (value: T) => string;

  constructor(parent: Validator<T>, options: AssertValidatorOptions<T>);

  constructor(
    parent: Validator<T>,
    condition: (value: T) => boolean,
    message?: string | ((value: T) => string)
  );

  constructor(
    private readonly parent: Validator<T>,
    conditionOrOptions: ((value: T) => boolean) | AssertValidatorOptions<T>,
    message?: string | ((value: T) => string)
  ) {
    super();

    if (typeof conditionOrOptions === "object") {
      this.condition = conditionOrOptions.condition;
      this.getMessage = getValidationError(
        conditionOrOptions.message,
        "assertion failed"
      );
    } else {
      this.condition = conditionOrOptions;
      this.getMessage = getValidationError(message, "assertion failed");
    }
  }

  parseSafe(value: unknown): ValidationResult<T> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    const success = this.condition(result as unknown as T);

    if (!success) {
      return {
        error: this.getMessage(value as unknown as T),
      };
    }

    return result;
  }
}
