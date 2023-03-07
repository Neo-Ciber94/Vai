/**
 * An error that occurred while validating an object.
 */
export type ValidationError = {
  /**
   * The value where the validation failed.
   */
  value: unknown;

  /**
   * The error message.
   */
  message: string;

  /**
   * The path where the validation failed.
   */
  path?: (string | number)[];
};

/**
 * Context used for validating objects.
 */
export class ValidationContext {
  private readonly _errors: ValidationError[] = [];

  /**
   * Adds a validation error.
   * @param error The error.
   */
  addError(error: ValidationError) {
    this._errors.push(error);
  }

  /**
   * Get all the validation errors.
   */
  get errors(): ReadonlyArray<ValidationError> {
    return this._errors.slice();
  }

  /**
   * Returns `true` if there is no validation errors.
   */
  get isValid(): boolean {
    return this._errors.length === 0;
  }
}
