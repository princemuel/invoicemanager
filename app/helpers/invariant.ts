const isProduction = process.env.NODE_ENV === "production";
const prefix = "Invariant failed";

export function invariant(
  condition: any,
  message?: string | (() => string),
): asserts condition {
  if (condition) return;

  if (isProduction)
    throw new Error(
      `${prefix}: An unexpected error occurred. Please contact support for assistance.`,
    );

  const provided = typeof message === "function" ? message() : message;
  const value = provided ? `${prefix}: ${provided}` : prefix;

  throw new Error(value);
}

class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}
