import { ValidatorOptions } from "../../core/options";
import { ValidationResult } from "../../core/validator";
import { NumberValidator } from "../common";

export class IntegerValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    options: ValidatorOptions = {}
  ) {
    super({
      message:
        options.message || ((v) => `expected integer but was ${typeof v}`),
    });
  }

  override parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);
    if (result.success === true && !Number.isInteger(value)) {
      return { error: this.message(value) };
    }

    return result;
  }
}

export class SafeNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    options: ValidatorOptions = {}
  ) {
    super({
      message: options.message || ((v) => `${v} is not a safe integer`),
    });
  }

  override parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);
    if (result.success === true && !Number.isSafeInteger(value)) {
      return { error: this.message(value) };
    }

    return result;
  }
}

export class FiniteNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    options: ValidatorOptions = {}
  ) {
    super({
      message: options.message || ((v) => `${v} is infinite`),
    });
  }

  override parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);
    if (result.success === true && !Number.isFinite(value)) {
      return { error: this.message(value) };
    }

    return result;
  }
}

export class EvenNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    options: ValidatorOptions = {}
  ) {
    super({
      message: options.message || ((v) => `${v} is not an even number`),
    });
  }

  override parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);
    if (result.success === true && result.value % 2 !== 0) {
      return { error: this.message(value) };
    }

    return result;
  }
}

export class OddNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    options: ValidatorOptions = {}
  ) {
    super({
      message: options.message || ((v) => `${v} is not an odd number`),
    });
  }

  override parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);
    if (result.success === true && result.value % 2 === 0) {
      return { error: this.message(value) };
    }

    return result;
  }
}
