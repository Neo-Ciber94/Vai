import { ValidationContext } from "../../core/context";
import {
  GetMessage,
  ValidatorOptions,
  getValidationError,
} from "../../core/options";
import {
  BaseObjectValidator,
  ValidationResult,
  Validator,
} from "../../core/validator";
import { UnknownValidator } from "./unknown.validator";

type RecordKeyType<K extends Validator<string>> = K extends Validator<infer U>
  ? U
  : never;

export class RecordValidator<
  K extends Validator<string>,
  V extends Validator<any> = UnknownValidator,
  Output = Record<RecordKeyType<K>, ReturnType<V["parse"]>>
> extends BaseObjectValidator<Output> {
  private readonly message: GetMessage;

  constructor(
    private readonly keyValidator: K,
    private readonly valueValidator: V,
    options: ValidatorOptions = {}
  ) {
    super();
    this.message = getValidationError(options.message, "invalid record type");
  }

  parseObjectSafe(
    value: unknown,
    ctx: ValidationContext
  ): ValidationResult<Output> {
    if (typeof value !== "object") {
      return {
        error: this.message(value),
      };
    }

    const data = value as any;
    const result = {} as any;

    for (const key in data) {
      // Validate the key
      const keyResult = this.keyValidator.parseSafe(key);
      if (keyResult.success !== true) {
        ctx.addError({
          path: [key],
          message: `key: ${keyResult.error}`,
          value: key,
        });
        continue;
      }

      // Validate the value
      const val = data[key];
      const valueResult = this.valueValidator.parseSafe(val);

      if (valueResult.success !== true) {
        ctx.addError({
          path: [key],
          message: `value: ${valueResult.error}`,
          value: val,
        });
        continue;
      }

      // Sets the value
      if (val !== undefined) {
        result[key] = valueResult.value;
      }
    }

    return {
      success: true,
      value: result,
    };
  }
}
