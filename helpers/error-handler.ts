import createHttpError from 'http-errors';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export function handleError<T extends unknown>(error: T) {
  // Errors with statusCode >= 500 are should not be exposed
  if (createHttpError.isHttpError(error) && error.expose) {
    // Handle all errors thrown by http-errors module
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  } else if (error instanceof z.ZodError) {
    // Handle zod validation errors
    return NextResponse.json(
      {
        error: {
          message: error.errors.map((error) => error.message).join('; '),
        },
      },
      { status: 400 }
    );
  } else {
    // default to 500 server error
    return NextResponse.json({
      error: { message: 'Internal Server Error', error },
      status: createHttpError.isHttpError(error) ? error.statusCode : 500,
    });
  }
}

// result.error.flatten((issue: ZodIssue) => ({
//   message: issue.message,
//   errorCode: issue.code,
// }));

// type FormattedErrors = z.inferFormattedError<typeof FormData>;
// /*
//   {
//     name?: {_errors?: string[]},
//     contactInfo?: {
//       _errors?: string[],
//       email?: {
//         _errors?: string[],
//       },
//       phone?: {
//         _errors?: string[],
//       },
//     },
//   }
// */

// type FlattenedErrors = z.inferFlattenedErrors<typeof FormData>;
// /*
//   {
//     formErrors: string[],
//     fieldErrors: {
//       email?: string[],
//       password?: string[],
//       confirm?: string[]
//     }
//   }
// */

// type FormDataErrors = z.inferFlattenedErrors<
//   typeof FormData,
//   { message: string; errorCode: string }
// >;

// /*
//   {
//     formErrors: { message: string, errorCode: string }[],
//     fieldErrors: {
//       email?: { message: string, errorCode: string }[],
//       password?: { message: string, errorCode: string }[],
//       confirm?: { message: string, errorCode: string }[]
//     }
//   }
// */
