const isProduction = process.env.NODE_ENV === "production";
const prefix = "Invariant failed";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

// function invariant<T>(
//   condition: T,
//   message?: string | (() => string),
// ): asserts condition {
//   if (condition) return;

//   if (isProduction)
//     throw new Error(
//       `${prefix}: An unexpected error occurred. Please contact support for assistance.`,
//     );

//   const provided = typeof message === "function" ? message() : message;
//   const value = provided ? `${prefix}: ${provided}` : prefix;

//   throw new Error(value);
// }

type InvariantFormatArg = string | number | boolean | null | undefined;

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

function invariant<T>(
  condition: T,
  format: string,
  ...args: InvariantFormatArg[]
): asserts condition {
  const nodeEnv = process.env.NODE_ENV || "development";

  if (nodeEnv !== "production") {
    if (format === undefined) {
      throw new Error("invariant requires an error message argument");
    }
  }

  if (!condition) {
    let error: Error;
    if (format === undefined) {
      error = new Error(
        "Minified exception occurred; use the non-minified dev environment " +
          "for the full error message and additional helpful warnings.",
      );
    } else {
      error = new Error(format.replace(/%s/g, () => String(args.shift())));
      error.name = "InvariantViolation";
    }

    // @ts-expect-error
    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error as Error;
  }
}

export { invariant };
