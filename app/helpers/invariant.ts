// from the outvariant package https://github.com/open-draft/outvariant
export const invariant: Invariant = (
  predicate,
  message,
  ...positionals
): asserts predicate => {
  if (!predicate) {
    throw new InvariantError(message, ...positionals);
  }
};

invariant.as = (ErrorConstructor, predicate, message, ...positionals) => {
  if (!predicate) {
    const formatMessage =
      positionals.length === 0 ? message : format(message, positionals);
    let error: Error;

    try {
      error = Reflect.construct(ErrorConstructor as CustomErrorConstructor, [
        formatMessage,
      ]);
    } catch (err) {
      error = (ErrorConstructor as CustomErrorFactory)(formatMessage);
    }

    throw error;
  }
};

const STACK_FRAMES_TO_IGNORE = 2;

/**
 * Remove the "outvariant" package trace from the given error.
 * This scopes down the error stack to the relevant parts
 * when used in other applications.
 */
function cleanErrorStack(error: Error): void {
  if (!error.stack) {
    return;
  }

  const nextStack = error.stack.split("\n");
  nextStack.splice(1, STACK_FRAMES_TO_IGNORE);
  error.stack = nextStack.join("\n");
}

class InvariantError extends Error {
  override name = "Invariant Violation";

  constructor(
    public override readonly message: string,
    ...positionals: any[]
  ) {
    super(message);
    this.message = format(message, ...positionals);
    cleanErrorStack(this);
  }
}

interface CustomErrorConstructor {
  new (message: string): Error;
}

interface CustomErrorFactory {
  (message: string): Error;
}

type CustomError = CustomErrorConstructor | CustomErrorFactory;

type Invariant = {
  (
    predicate: unknown,
    message: string,
    ...positionals: any[]
  ): asserts predicate;

  as(
    ErrorConstructor: CustomError,
    predicate: unknown,
    message: string,
    ...positionals: unknown[]
  ): asserts predicate;
};

const POSITIONALS_EXP = /(%?)(%([sdijo]))/g;

function serializePositional(positional: any, flag: string) {
  switch (flag) {
    // Strings.
    case "s":
      return positional;

    // Digits.
    case "d":
    case "i":
      return Number(positional);

    // JSON.
    case "j":
      return JSON.stringify(positional);

    // Objects.
    case "o": {
      // Preserve strings to prevent extra quotes around them.
      if (typeof positional === "string") return positional;
      const json = JSON.stringify(positional);

      // If the positional isn't serializable, return it as-is.
      if (json === "{}" || json === "[]" || /^\[object .+?\]$/.test(json)) {
        return positional;
      }

      return json;
    }
  }
}

function format(message: string, ...positionals: any[]) {
  if (positionals.length === 0) return message;

  let positionalIndex = 0;
  let formattedMessage = message.replace(
    POSITIONALS_EXP,
    (match, isEscaped, _, flag) => {
      const positional = positionals[positionalIndex];
      const value = serializePositional(positional, flag);

      if (!isEscaped) {
        positionalIndex++;
        return value;
      }

      return match;
    },
  );

  // Append unresolved positionals to string as-is.
  if (positionalIndex < positionals.length) {
    formattedMessage += ` ${positionals.slice(positionalIndex).join(" ")}`;
  }

  formattedMessage = formattedMessage.replace(/%{2,2}/g, "%");

  return formattedMessage;
}
