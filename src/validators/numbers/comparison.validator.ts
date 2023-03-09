import { ValidatorOptions, getValidationError } from "../../core/options";
import { ValidationResult } from "../../core/validator";
import { NumberValidator } from "../common";

export type ValidatorComparisonOptions = {
  message?: string | ((value: number, other: number) => string);
};

// max(number)
export class MaxNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    private readonly maxValue: number,
    options: ValidatorComparisonOptions
  ) {
    super({
      message(value) {
        const message = getValidationError(
          options.message,
          (value, max) => `maximum is ${max} but value was ${value}`
        );
        return message(value as number, maxValue);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true || result.value < this.maxValue) {
      return result;
    }

    return { error: this.message(result.value) };
  }
}

// min(number)
export class MinNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    private readonly minValue: number,
    options: ValidatorComparisonOptions
  ) {
    super({
      message(value) {
        const message = getValidationError(
          options.message,
          (value, min) => `minimum is ${min} but value was ${value}`
        );
        return message(value as number, minValue);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true || result.value > this.minValue) {
      return result;
    }

    return { error: this.message(result.value) };
  }
}

// gt(number)
export class GreaterThanNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    private readonly other: number,
    options: ValidatorComparisonOptions
  ) {
    super({
      message(value) {
        const message = getValidationError(
          options.message,
          (value, other) => `${value} is lower than ${other}`
        );
        return message(value as number, other);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true || result.value > this.other) {
      return result;
    }

    return { error: this.message(result.value) };
  }
}

// lt(number)
export class LowerThanNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    private readonly other: number,
    options: ValidatorComparisonOptions
  ) {
    super({
      message(value) {
        const message = getValidationError(
          options.message,
          (value, other) => `${value} is greater than ${other}`
        );
        return message(value as number, other);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true || result.value < this.other) {
      return result;
    }

    return { error: this.message(result.value) };
  }
}

// gte(number)
export class GreaterOrEqualThanNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    private readonly other: number,
    options: ValidatorComparisonOptions
  ) {
    super({
      message(value) {
        const message = getValidationError(
          options.message,
          (value, other) => `${value} is lower than ${other}`
        );
        return message(value as number, other);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true || result.value >= this.other) {
      return result;
    }

    return { error: this.message(result.value) };
  }
}

// lte(number)
export class LowerOrEqualThanNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    private readonly other: number,
    options: ValidatorComparisonOptions
  ) {
    super({
      message(value) {
        const message = getValidationError(
          options.message,
          (value, other) => `${value} is greater than ${other}`
        );
        return message(value as number, other);
      },
    });
  }

  parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true || result.value <= this.other) {
      return result;
    }

    return { error: this.message(result.value) };
  }
}

// positive()
export class PositiveNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    options: ValidatorOptions
  ) {
    super({ message: options.message || ((v) => `${v} is not positive`) });
  }

  parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true || result.value > 0) {
      return result;
    }

    return { error: this.message(result.value) };
  }
}

// negative()
export class NegativeNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    options: ValidatorOptions
  ) {
    super({ message: options.message || ((v) => `${v} is not negative`) });
  }

  parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true || result.value < 0) {
      return result;
    }

    return { error: this.message(result.value) };
  }
}

// nonzero()
export class NonZeroNumberValidator extends NumberValidator {
  constructor(
    private readonly parent: NumberValidator,
    options: ValidatorOptions
  ) {
    super({ message: options.message || ((v) => `${v} is zero`) });
  }

  parseSafe(value: unknown): ValidationResult<number> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true || result.value !== 0) {
      return result;
    }

    return { error: this.message(result.value) };
  }
}
