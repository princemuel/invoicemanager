// import type { RequestInit } from 'graphql-request/build/esm/types.dom';
// This helps with type inference when using the component
interface ModalState {
  show: boolean;
  open: () => void;
  close: () => void;
}

interface IProvider {
  id: 'github' | 'google';
  name: Capitalize<IProvider['id']>;
}

interface IParams {
  [key: string]: string | undefined;
}
interface LayoutRouteProps {
  [key: string]: React.ReactNode;
}

type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

interface ServerActionResult<Result>
  extends Promise<
    | Result
    | {
        error: string;
      }
  > {}

type SuccessResponseCode = 200;
type ErrorResponseCode = 400 | 500;
type ResponseCode = SuccessResponseCode | ErrorResponseCode;

type ResponseShape = {
  [C in ResponseCode]: {
    code: C;
    body: C extends SuccessResponseCode
      ? { success: true }
      : { success: false; error: string };
  };
}[ResponseCode];

type Lookup<T> = {
  [K in keyof T]: {
    key: K;
  };
}[keyof T];

type PrefixType<E extends { type: string }> = {
  type: `PREFIX_${E['type']}`;
} & Omit<E, 'type'>;

type ExampleEvent = {
  [E in Event as E['type']]: PrefixType<E>;
}[Event['type']];
