import { ValidationResult, Validator } from "../../core/validator";

export interface AssertValidatorOptions<T> {
  condition: (value: T) => boolean;
  message?: string | ((value: T) => string);
}

export class AssertValidator<T> extends Validator<T> {
  private readonly condition: (value: T) => boolean;
  private readonly message: (value: T) => string;

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
      this.message = getMessageFunction(conditionOrOptions.message);
    } else {
      this.condition = conditionOrOptions;
      this.message = getMessageFunction(message);
    }
  }

  parseSafe(value: unknown): ValidationResult<T> {
    const result = this.parent.parseSafe(value);

    if (result.success !== true) {
      return result;
    }

    const success = this.condition(result as T);

    if (!success) {
      return {
        error: this.message(value as T),
      };
    }

    return result;
  }
}

function getMessageFunction<T>(
  valueOrFunction: string | ((arg: T) => string) | undefined
) {
  if (valueOrFunction == null) {
    return () => "assertion failed";
  }

  return typeof valueOrFunction === "string"
    ? () => valueOrFunction
    : valueOrFunction;
}
