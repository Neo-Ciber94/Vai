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
  TupleValidator,
  EnumValidator,
  EnumValidatorOptions,
  InstanceOfValidatorOptions,
} from "./validators/common";
import type { BooleanValidatorOptions } from "./validators/common/boolean.validator";
import type { DateValidatorOptions } from "./validators/common/date.validator";
import type { ValidEnumType } from "./validators/common/enum.validator";
import type { PrimitiveType } from "./validators/common/literal.validator";
import { NumberValidatorOptions } from "./validators/common/number.validator";
import type { ObjectType } from "./validators/common/instanceof.validator";
import { StringValidatorOptions } from "./validators/common/string.validator";

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
  string: (options: StringValidatorOptions = {}) =>
    new StringValidator(options),

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
   * A validator for that expect the matching values.
   * @param values The valid values of the enum.
   * @param options The options.
   */
  enum: <T extends ValidEnumType, U extends Readonly<[T, ...T[]]>>(
    values: U,
    options: EnumValidatorOptions = {}
  ) => new EnumValidator(values, options),

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
  array: <T extends Validator<any> = AnyValidator>(schema?: T) =>
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
