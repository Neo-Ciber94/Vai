import { Validator } from "./core/validator";
import {
  UnknownValidator,
  StringValidator,
  NumberValidator,
  BooleanValidator,
  NullValidator,
  UndefinedValidator,
  NeverValidator,
  ObjectValidator,
  ArrayValidator,
  AnyValidator,
  DateValidator,
} from "./validators/common";
import { TupleValidator } from "./validators/common/tuple.validator";

/**
 * Convenient type for accessing the validators.
 */
const baseValidator = {
  /**
   * A validator that always success as any.
   */
  any: () => new AnyValidator(),

  /**
   * A validator that always success as unknown.
   */
  unknown: () => new UnknownValidator(),

  /**
   * String validator.
   */
  string: () => new StringValidator(),

  /**
   * Number validator.
   */
  number: () => new NumberValidator(),

  /**
   * Boolean validator.
   */
  boolean: () => new BooleanValidator(),

  /**
   * Date validator.
   */
  date: () => new DateValidator(),

  /**
   * A null validator.
   */
  null: () => new NullValidator(),

  /**
   * An undefined validator.
   */
  undefined: () => new UndefinedValidator(),

  /**
   * A validator that always fails.
   */
  never: () => new NeverValidator(),

  /**
   * Object validator.
   */
  object: <T extends Record<string, Validator<unknown>>>(shape: T) =>
    new ObjectValidator<T>(shape),

  /**
   * Array validator.
   */
  array: <T extends Validator<unknown> = UnknownValidator>(schema?: T) =>
    new ArrayValidator<T>(schema!),

  /**
   * A tuple validator.
   */
  tuple: <T extends [] | [Validator<unknown>, ...Validator<unknown>[]]>(
    schema: T
  ) => new TupleValidator(schema),
} as const;

/**
 * Creates the root validator for an application.
 *
 * Here you can add or override any existing validator.
 * @param schemas The schemas to add.
 * @returns A validator for the entire application.
 */
export function createValidator<T extends Record<string, Validator<unknown>>>(
  schemas?: T
): T & typeof baseValidator {
  const initialSchemas: any = schemas || {};
  return Object.freeze({ ...baseValidator, ...initialSchemas });
}