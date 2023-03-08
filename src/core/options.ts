/**
 * Represents a function that returns the error message.
 */
export type ErrorMessage<T = unknown> = (value: T) => string;

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
    return typeof message === "string" ? message : message!(...params);
  };
}
