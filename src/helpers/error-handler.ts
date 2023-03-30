type ErrorWithMessage = {
  message: string;
};
type ErrorDataWithMessage = { data: { message: string } };

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

function toErrorWithMessage(error: unknown): ErrorWithMessage {
  if (isErrorWithMessage(error)) return error;
  if (isErrorDataMessage(error)) return error.data;

  try {
    return new Error(JSON.stringify(error));
  } catch {
    // fallback in case there's an error stringifying the error
    // like with circular references for example.
    return new Error(String(error));
  }
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function isErrorDataMessage(error: unknown): error is ErrorDataWithMessage {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    typeof (error as any).data?.message === 'string'
  );
}
