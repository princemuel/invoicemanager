/*===============================*
          HELPER TYPES
 *===============================*
*/

type Immutable<T> = T extends PrimitiveType
  ? T
  : T extends AtomicObject
  ? T
  : T extends Array<infer A>
  ? ReadonlyArray<Immutable<A>>
  : T extends IfAvailable<ReadonlyMap<infer K, infer V>>
  ? ReadonlyMap<Immutable<K>, Immutable<V>>
  : T extends IfAvailable<ReadonlySet<infer S>>
  ? ReadonlySet<Immutable<S>>
  : T extends WeakReferences
  ? T
  : T extends object
  ? {
      // !NOTE: removes methods on object
      readonly [P in NonFunctionPropertyNames<T>]: Immutable<T[P]>;
      // !NOTE: use { readonly [P in keyof T]: Immutable<T[P]> } to add methods
    }
  : unknown;

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];

type LooseAutocomplete<T extends string> = T | Omit<string, T>;

type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: Expand<O[K]> }
    : never
  : T;

type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer A>
  ? DeepPartialArray<A>
  : T extends object
  ? DeepPartialObject<T>
  : T | undefined;

type DeepPartialArray<T> = Array<DeepPartial<T>>;
type DeepPartialObject<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};

type KeyValuePair<K extends keyof any = string, V = string> = Record<K, V>;
interface RecursiveKeyValuePair<K extends keyof any = string, V = string> {
  [key: string]: V | RecursiveKeyValuePair<K, V>;
}

type OptionalUnion<
  U extends Record<string, any>,
  A extends keyof U = U extends U ? keyof U : never
> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;

type WeakReferences =
  | IfAvailable<WeakMap<any, any>>
  | IfAvailable<WeakSet<any>>;

type IfAvailable<T, Fallback = void> = true | false extends (
  T extends never ? true : false
)
  ? Fallback
  : keyof T extends never
  ? Fallback
  : T;

// get method names in an object
type FunctionPropertyNames<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

// get non method names in an object
type NonFunctionPropertyNames<T> = {
  [P in keyof T]: T[P] extends Function ? never : P;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type PrimitiveType =
  | string
  | number
  | boolean
  | undefined
  | null
  | bigint
  | symbol;
type AtomicObject = Function | RegExp | Promise<any> | Date;
