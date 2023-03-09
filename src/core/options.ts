/**
 * Represents a function that returns the error message.
 */
export type GetMessage<T = unknown> = T extends unknown[]
  ? (...args: T) => string
  : T extends infer U
  ? (arg: U) => string
  : never;

/**
 * The params that take a validator.
 */
export type ValidatorOptions<T = unknown> = {
  /**
   * The error message or a function that returns the error message.
   */
  message?: string | ((value: T) => string);
};

/**
 * Given a message or function returns a function that returns the error message.
 * @param message The error message string or function that returns the error message.
 * @param defaultMessage The default error message.
 * @returns A function that returns the error message.
 */
export function getValidationError<T extends unknown[]>(
  message: (string | ((...args: T) => string)) | undefined,
  defaultMessage: string | ((...args: T) => string)
) {
  if (message == null) {
    message = defaultMessage;
  }

  return (...params: T) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return typeof message === "string" ? message : message!(...params);
  };
}
