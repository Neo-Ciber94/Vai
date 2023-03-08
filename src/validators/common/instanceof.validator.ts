import { ValidationResult, Validator } from "../../core/validator";
import { getErrorMessage } from "../../utils/getErrorMessage";

/**
 * Represents an object that can be instantiated.
 */
export type ObjectType = { new (...args: any[]): any };

export interface InstanceOfValidatorOptions {
  message?: string | ((value: unknown) => string);
}

export class InstanceOfValidator<
  T extends ObjectType,
  Output = InstanceType<T>
> extends Validator<Output> {
  private readonly message: (value: unknown) => string;

  constructor(
    private readonly obj: T,
    options: InstanceOfValidatorOptions = {}
  ) {
    super();
    this.message = getErrorMessage(
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
