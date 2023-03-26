type ErrorWithMessage = {
  message: string;
};

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

function toErrorWithMessage(error: unknown): ErrorWithMessage {
  if (isErrorWithMessage(error)) return error;

  try {
    return new Error(JSON.stringify(error));
  } catch {
    // fallback in case there's an error stringifying the error
    // like with circular references for example.
    return new Error(String(error));
  }
}
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}
