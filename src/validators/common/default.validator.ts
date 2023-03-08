import { ValidationResult, Validator } from "../../core/validator";

export class DefaultValidator<T> extends Validator<T> {
  constructor(
    private readonly parent: Validator<T>,
    private readonly defaultValue: T | (() => T)
  ) {
    super();
  }

  parseSafe(value: unknown): ValidationResult<T> {
    if (value == null) {
      let defaultValue: T;

      if (typeof this.defaultValue === "function") {
        defaultValue = (this.defaultValue as () => T)();
      } else {
        defaultValue = this.defaultValue;
      }

      return {
        success: true,
        value: defaultValue,
      };
    }

    return this.parent.parseSafe(value);
  }
}
