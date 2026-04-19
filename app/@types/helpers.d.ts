type Prettify<T> = { [K in keyof T]: T[K] } & NonNullable<unknown>;

type JSONValue =
  | string
  | number
  | boolean
  | null
  | readonly JSONValue[]
  | { readonly [key: string]: JSONValue };
