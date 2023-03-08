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
  UnionValidator,
  VoidValidator,
  LiteralValidator,
  InstanceOfValidator,
} from "./validators/common";
import { BooleanValidatorOptions } from "./validators/common/boolean.validator";
import { DateValidatorOptions } from "./validators/common/date.validator";
import {
  InstanceOfValidatorOptions,
  ObjectType,
} from "./validators/common/instanceof.validator";

import { PrimitiveType } from "./validators/common/literal.validator";
import { NumberValidatorOptions } from "./validators/common/number.validator";
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
  number: (options: NumberValidatorOptions = {}) =>
    new NumberValidator(options),

  /**
   * Boolean validator.
   */
  boolean: (options: BooleanValidatorOptions = {}) =>
    new BooleanValidator(options),

  /**
   * Date validator.
   */
  date: (options: DateValidatorOptions = {}) => new DateValidator(options),

  /**
   * A null validator.
   */
  null: () => new NullValidator(),

  /**
   * An undefined validator.
   */
  undefined: () => new UndefinedValidator(),

  /**
   * An void validator, same as undefined.
   */
  void: () => new VoidValidator(),

  /**
   * A validator that always fails.
   */
  never: () => new NeverValidator(),

  /**
   * A validator for a constant literal type value.
   */
  literal: <T extends PrimitiveType>(constant: T) =>
    new LiteralValidator(constant),

  /**
   * A validator for check type instances.
   * @param obj The object constructor.
   * @param options The options.
   */
  instanceof: <T extends ObjectType>(
    obj: T,
    options: InstanceOfValidatorOptions = {}
  ) => new InstanceOfValidator(obj, options),

  /**
   * Object validator.
   */
  object: <T extends Record<string, Validator<any>>>(shape: T) =>
    new ObjectValidator<T>(shape),

  /**
   * Array validator.
   */
  array: <T extends Validator<unknown> = UnknownValidator>(schema?: T) =>
    new ArrayValidator<T>(schema!),

  /**
   * Makes an union of two validators.
   */
  union: <T extends Validator<unknown>[]>(schemas: T) =>
    new UnionValidator(schemas),

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
