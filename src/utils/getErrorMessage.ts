/**
 * Given a message or function returns a function that returns the error message.
 * @param message The error message string or function that returns the error message.
 * @param defaultMessage The default error message.
 * @returns A function that returns the error message.
 */
export function getErrorMessage<T = unknown>(
  message: string | ((value: T) => string) | undefined,
  defaultMessage: string | ((value: T) => string)
): (value: T) => string {
  const m = message == null ? defaultMessage : message;
  return typeof m === "string" ? () => m : m;
}
