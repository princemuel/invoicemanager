/*===============================*
          HELPER TYPES
 *===============================*
*/

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];

export type LooseAutocomplete<T extends string> = T | Omit<string, T>;

export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: Expand<O[K]> }
    : never
  : T;

export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer A>
  ? DeepPartialArray<A>
  : T extends object
  ? DeepPartialObject<T>
  : T | undefined;

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}
type DeepPartialObject<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};

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
