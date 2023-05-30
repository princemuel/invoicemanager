// import type { RequestInit } from 'graphql-request/build/esm/types.dom';
// This helps with type inference when using the component

interface IErrorResponse {
  response: { errors: IError[]; data: IErrorData };
}

interface IError {
  message: string;
  locations: IErrorLocation[];
  path: string[];
  extensions: IErrorExtensions;
}
interface IErrorLocation {
  line: number;
  column: number;
}
interface IErrorExtensions {
  code: string;
  http: { status: number };
  stacktrace: string[];
}
interface IErrorData {
  [x: string]: any;
}
