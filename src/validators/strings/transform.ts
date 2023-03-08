import { ValidationResult } from "../../core/validator";
import { StringValidator } from "../common";

export class TrimStringValidator extends StringValidator {
  constructor(private readonly parent: StringValidator) {
    super();
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);
    if (result.success !== true) {
      return result;
    }

    return {
      success: true,
      value: result.value.trim(),
    };
  }
}

export class LowerCaseStringValidator extends StringValidator {
  constructor(private readonly parent: StringValidator) {
    super();
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);
    if (result.success !== true) {
      return result;
    }

    return {
      success: true,
      value: result.value.toLowerCase(),
    };
  }
}

export class UpperCaseStringValidator extends StringValidator {
  constructor(private readonly parent: StringValidator) {
    super();
  }

  parseSafe(value: unknown): ValidationResult<string> {
    const result = this.parent.parseSafe(value);
    if (result.success !== true) {
      return result;
    }

    return {
      success: true,
      value: result.value.toUpperCase(),
    };
  }
}
