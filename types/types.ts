import InferNextPropsType from "infer-next-props-type";
import type { NextPage } from "next";
import type { AppContext, AppProps } from "next/app";
import { ParsedUrlQuery } from "querystring";
import type { ReactElement, ReactNode } from "react";

/*===============================*
          EVENT TYPES
 *===============================*
*/
export type ReactFormEvent = React.FormEvent<HTMLFormElement>;
export type ReactSelectEvent = React.ChangeEvent<HTMLSelectElement>;
export type ReactInputEvent = React.ChangeEvent<HTMLInputElement>;
export type ReactMouseEvent = React.MouseEvent<HTMLButtonElement>;

/*===============================*
          NEXTJS TYPES
 *===============================*
*/
export type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
export type { InferNextPropsType };
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
export type AppPropsWithLayout<P = any> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
} & {
  getInitialProps?: (context: AppContext) => AppProps<P> | Promise<AppProps<P>>;
};

/*===============================*
          HELPER TYPES
 *===============================*
*/

export interface Params extends ParsedUrlQuery {
  id: string;
  status: string;
}

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];

export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: Expand<O[K]> }
    : never
  : T;

export type KeyValuePair<K extends keyof any = string, V = string> = Record<
  K,
  V
>;
export interface RecursiveKeyValuePair<
  K extends keyof any = string,
  V = string
> {
  [key: string]: V | RecursiveKeyValuePair<K, V>;
}

export type OptionalUnion<
  U extends Record<string, any>,
  A extends keyof U = U extends U ? keyof U : never
> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
