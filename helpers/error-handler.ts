import { z } from 'zod';
import { HttpError, isHttpError } from 'http-errors-enhanced';

export function handleServerError(exception: unknown) {
  // Errors with statusCode >= 500 are should not be exposed
  if (isHttpError(exception)) {
    const error = exception as HttpError;
    return error.expose
      ? Response.json(
          { status: 'failed', error: error.message },
          { status: error.status }
        )
      : Response.json(
          {
            status: 'failed',
            error: 'An unkwown error occurred. Please try again',
          },
          { status: error.status }
        );
  } else if (exception instanceof z.ZodError) {
    return Response.json(
      {
        status: 'failed',
        error: exception.errors.map((issue) => issue.message).join('; '),
      },
      { status: 400 }
    );
  }

  return Response.json(
    {
      status: 'failed',
      error: 'An unkwown error occurred. Please try again',
    },
    {
      status: 500,
    }
  );
}
