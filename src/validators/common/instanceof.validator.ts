import {
  ErrorMessage,
  ValidatorOptions,
  getValidationError,
} from "../../core/options";
import { ValidationResult, Validator } from "../../core/validator";

/**
 * Represents an object that can be instantiated.
 */
export type ObjectType = { new (...args: any[]): any };

export class InstanceOfValidator<
  T extends ObjectType,
  Output = InstanceType<T>
> extends Validator<Output> {
  protected readonly message: ErrorMessage;

  constructor(private readonly obj: T, options: ValidatorOptions = {}) {
    super();

    this.message = getValidationError(
      options.message,
      () => `value is not instance of ${obj.name}`
    );
  }

  parseSafe(value: unknown): ValidationResult<Output> {
    if (!(value instanceof this.obj)) {
      return {
        error: this.message(value),
      };
    }

    return {
      success: true,
      value: value as unknown as Output,
    };
  }
}
