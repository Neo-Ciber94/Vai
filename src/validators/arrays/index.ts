export interface ArrayLengthValidatorOptions {
  message?: string | ((value: any[]) => string);
}

export { MaxArrayLengthValidator } from "./max.validator";
export { MinArrayLengthValidator } from "./min.validator";
export { ExactArrayLengthValidator } from "./length.validator";
