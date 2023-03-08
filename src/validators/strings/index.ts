export interface StringLengthValidatorOptions {
  message?: string | ((value: string) => string);
}

export { MaxStringLengthValidator } from "./max.validator";
export { MinStringLengthValidator } from "./min.validator";
export { ExactStringLengthValidator } from "./length.validator";
export { RegexValidator, RegexValidatorOptions } from "./regex.validator";

export {
  CheckStringValidatorOptions,
  EndsWithStringValidator,
  StartsWithStringValidator,
  IncludesStringValidator,
} from "./check.validator";

export {
  EmailStringValidator,
  EmailStringValidatorOptions,
} from "./email.validator";
