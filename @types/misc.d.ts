/*===============================*
          HELPER TYPES
 *===============================*
*/

declare namespace Misc {
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

  type GuardQualifier<Function extends VariadicFunction> = [
    validator: <Result extends boolean>(
      ...args: Parameters<Function>
    ) => Result,
    executor: Function,
  ];

  type LooseAutocomplete<T extends string> = T | Omit<string, T>;

  type ObjectEntry<T extends {}> = T extends object
    ? { [K in keyof T]: [K, Required<T>[K]] }[keyof T] extends infer E
      ? E extends [infer K extends string | number, infer V]
        ? [`${K}`, V]
        : never
      : never
    : never;

  type TupleEntry<
    T extends readonly unknown[],
    I extends unknown[] = [],
    R = never,
  > = T extends readonly [infer Head, ...infer Tail]
    ? TupleEntry<Tail, [...I, unknown], R | [`${I['length']}`, Head]>
    : R;

  type Entry<T extends {}> = T extends readonly [unknown, ...unknown[]]
    ? TupleEntry<T>
    : T extends ReadonlyArray<infer U>
    ? [`${number}`, U]
    : ObjectEntry<T>;

  type Expand<T> = T extends (...args: infer A) => infer R
    ? (...args: Expand<A>) => Expand<R>
    : T extends object
    ? T extends infer O
      ? { [K in keyof O]: Expand<O[K]> }
      : never
    : T;

  type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
  }[keyof T];

  type DeepRequired<T> = T extends BrowserNativeObject | Blob
    ? T
    : {
        [K in keyof T]-?: NonNullable<DeepRequired<T[K]>>;
      };

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
    [key: K]: V | RecursiveKeyValuePair<K, V>;
  }

  type OptionalUnion<
    U extends Record<string, any>,
    A extends keyof U = U extends U ? keyof U : never,
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

  /**
   * Makes a composition of functions from received arguments.
   */
  type Compose<
    Arguments extends any[],
    Functions extends any[] = [],
  > = Arguments['length'] extends 0
    ? Functions
    : Arguments extends [infer A, infer B]
    ? [...Functions, (arg: A) => B]
    : Arguments extends [infer A, ...infer Rest, infer P, infer L]
    ? Compose<[A, ...Rest, P], [...Functions, (arg: P) => L]>
    : [];

  /**
   * Destructures a composition of functions into arguments.
   */
  type Decompose<
    Functions extends UnaryFunction[],
    Arguments extends any[] = [],
  > = Functions extends [(arg: infer Arg) => infer Return]
    ? [...Arguments, Arg, Return]
    : Functions extends [
        ...infer Rest extends UnaryFunction[],
        (arg: infer Arg) => any,
      ]
    ? Decompose<Rest, [...Arguments, Arg]>
    : [];

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

  /**
   * A type of a function accepting an arbitrary amount of arguments
   */
  type VariadicFunction = (...args: any[]) => any;
  /**
   * A type of a function accepting exactly one argument
   */
  type UnaryFunction = (arg: any) => any;

  type JSONValue =
    | string
    | number
    | boolean
    | JSONValue[]
    | {
        [k: string]: JSONValue;
      };

  type PrimitiveType =
    | string
    | number
    | bigint
    | boolean
    | symbol
    | null
    | undefined;
  type AtomicObject = Function | RegExp | Promise<any> | Date;
  type BrowserNativeObject = Date | FileList | File;
}
