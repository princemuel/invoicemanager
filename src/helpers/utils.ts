import { cx, type CxOptions as ClassArgs } from 'class-variance-authority';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        },
      ],
    },
  },
});

export function cn(...args: ClassArgs) {
  return customTwMerge(cx(args));
}

/*---------------------------------*
            STRING UTILS           *
  ---------------------------------*
 */

export function capitalize(string = '') {
  return string[0].toLocaleUpperCase() + string.slice(1).toLocaleLowerCase();
}

export const trim = (string = '') => string.trim();
export const omitFirstChar = (string = '') => string.slice(1);

export function pluralize(word: string, value: number) {
  return value === 1 ? `${word}` : `${word}s`;
}

export function truncate(str = '', length = str.length) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}
const replaceDot = (value: string) => value.replaceAll('.', '-');
const replaceCaps = (value: string) =>
  value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

export const replaceDotsAndCaps = compose(replaceCaps, replaceDot);

export function createRegExpFromExtensions(...extensions: string[]) {
  return new RegExp(`\\.(${extensions.join('|')})$`, 'i');
}

type EndsWith<W, S extends string> = W extends `${infer _R}${S}` ? W : never;

export const endsWith = <Word extends string, Suffix extends string>(
  str: Word,
  suffix: Suffix
): str is EndsWith<Word, Suffix> => {
  return str.endsWith(suffix);
};

/*---------------------------------*
            NUMBER UTILS           *
  ---------------------------------*
 */

export function approximate(num = 0, fractionDigits = 2) {
  return Number.parseFloat(num.toFixed(fractionDigits));
}

export function safeNum(value: any, defaultValue = 0): number {
  const num = Number(value);
  return (Number.isNaN(num) || isNaN(num)) && !Object.is(num, 0)
    ? defaultValue
    : num;
}

export function range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

interface Item {
  quantity?: number;
  price?: number;
  total?: number;
}
type FirstArg = number | Item[];

export function calculateTotal<T extends FirstArg>(
  a?: T,
  b?: T extends number
    ? NonNullable<T>
    : T extends (infer _)[]
    ? 'total'
    : never
) {
  if (Array.isArray(a)) {
    return a.reduce((acc, item) => {
      const { total = 0, quantity = 0, price = 0 } = item;
      return b === 'total' ? acc + total : acc + quantity * price;
    }, 0);
  }

  // bailout since the function expects 2 number params, or an array params
  return safeNum(a) * safeNum(b);
}

export const formatAmount = (price = 0, fractionDigits = 2) => {
  return Intl.NumberFormat('en-GB', {
    maximumFractionDigits: fractionDigits,
    style: 'currency',
    currency: 'GBP',
  }).format(price);
};

type FormatDateFunction = (
  date?: string,
  formatOptions?: Intl.DateTimeFormatOptions[],
  separator?: string
) => string;

export const formatDate: FormatDateFunction = (
  date = new Date().toISOString(),
  formatOptions = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }],
  separator = ' '
) => {
  return formatOptions
    .map((options) => {
      const dateFormatter = new Intl.DateTimeFormat('en', options);
      return dateFormatter.format(new Date(date));
    })
    .join(separator);
};

export function getMonth(string: string) {
  return string?.split(/(?<=^\S+)\s/)[1];
}

export function monthsAgo(datetime: Date, value = 0) {
  datetime.setMonth(datetime.getMonth() - value);
  return datetime;
}

/*---------------------------------*
            OBJECT UTILS           *
  ---------------------------------*
 */

export function serialize<T>(data: T): NonNullable<T> {
  return JSON.parse(JSON.stringify(data));
}

export const objectKeys = <T extends object>(obj: T): Array<keyof T> => {
  return Object.keys(obj) as Array<keyof T>;
};

export function reverseRecord<T extends PropertyKey, U extends PropertyKey>(
  data: Record<T, U>
) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [value, key])
  ) as Record<U, T>;
}

export function singleton<T>(name: string, callback: () => T): T {
  const g = globalThis as any;
  g.__singletons ??= new Map();

  if (!g.__singletons.has(name)) g.__singletons.set(name, callback());
  return g.__singletons.get(name);
}
// export function singleton<T>(name: string, callback: () => T): T {
//   const g = global as any;

//   g.__singletons ??= {};
//   g.__singletons[name] ??= callback();

//   return g.__singletons[name];
// }

/*---------------------------------*
            ARRAY UTILS            *
  ---------------------------------*
 */

export function hasValues<T>(
  value: T[] | null | undefined
): value is NonNullable<T[]> {
  return Array.isArray(value) && value.length > 0;
}

export function buildInvoiceMsg(message: string) {
  return function (data: any[]) {
    const itemCount = data?.length || 0;
    const verb = itemCount === 1 ? 'is' : 'are';

    return message
      .replace('{{ verb }}', verb)
      .replace('{{ count }}', `${itemCount}`);
  };
}

export function map<T>(
  iterable: Iterable<T>,
  cb: (...args: any) => T
): IterableIterator<T> {
  const iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<T> {
      const next = iterator.next();
      return next.done ? next : { value: cb(next.value) };
    },
  };
}

export function filter<T>(
  iterable: Iterable<T>,
  predicate: (...args: any) => boolean
) {
  const iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<T, boolean> {
      for (;;) {
        const next = iterator.next();
        if (next.done || predicate(next.value)) {
          return next;
        }
      }
    },
  };
}

// reverse array function using iterators
export function reverse<T>(data: ArrayLike<T>): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      let len = data.length;
      return {
        next(): IteratorResult<T> {
          return len
            ? { value: data[--len], done: false }
            : { value: undefined, done: true };
        },
      };
    },
  };
}

export function* take<T>(n: number, iterable: Iterable<T>) {
  const iterator = iterable[Symbol.iterator]();
  while (n-- > 0) {
    const next = iterator.next();
    if (next.done) return;
    else yield next.value;
  }
}

export function* zip<T>(...iterables: Array<Iterable<T>>) {
  const iterators = iterables.map((iterator) => iterator[Symbol.iterator]());
  let idx = 0;
  while (iterators.length > 0) {
    if (idx >= iterators.length) {
      idx = 0;
    }
    const next = iterators[idx].next();
    if (next.done) {
      iterators.splice(idx, 1);
    } else {
      yield next.value;
      idx++;
    }
  }
}

export function pluck<I, K extends keyof I>(items: I[], key: K): I[K][] {
  return items.map((item) => item[key]);
}

/**
 * A Generic Ranking Algorithm
 * @param items T[]
 * @param order 'asc' | 'desc'
 * @returns An array containing the sorted items according to the ranking algorithm
 */

export const rank = <T>(
  items: T[],
  order: 'asc' | 'desc',
  callbackfn: (value: T) => number
): T[] => {
  return items
    .map((item) => ({
      item,
      rank: callbackfn(item),
    }))
    .sort((a, b) => (order === 'asc' ? a.rank - b.rank : b.rank - a.rank))
    .map((ranked) => ranked.item);
};

/*---------------------------------*
            DOM UTILS              *
  ---------------------------------*
 */

export const isBrowser = typeof window !== 'undefined';
export const isNavigator = typeof navigator !== 'undefined';

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>)
    );
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>)
    );
  }
}

/**
 * Calls the callback if in the appropriate environment
 */
export function checkEnv(env: 'development' | 'production', cb: () => void) {
  if (process.env.NODE_ENV === env) cb();
}

/*---------------------------------*
            IMAGE UTILS            *
  ---------------------------------*
 */

export const shimmer = (width: number, height: number) => `
  <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="#333" />
    <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window?.btoa(str);

/*---------------------------------*
            FP UTILS               *
  ---------------------------------*
*/
export /**
 * (B -> C) . (A -> B) = A -> C
 */
function compose<A extends any[], B, C>(
  f: (arg: B) => C,
  g: (...args: A) => B
): (...args: A) => C;

export /**
 * (B -> C) . (A -> B) = A -> C
 */
function compose<A extends any[], B, C>(
  f: (arg: B) => C,
  g: (...args: A) => B,
  ...args: A
): C;

export /**
 * (B -> C) . (A -> B) = A -> C
 */
function compose<A extends any[], B, C>(
  f: (arg: B) => C,
  g: (...args: A) => B,
  ...maybeArgs: A
) {
  return maybeArgs.length === 0
    ? (...args: A) => f(g(...args))
    : f(g(...maybeArgs));
}

export /**
 * A function which accepts the pairs of guards:
 * the first one is the `validator`, expected to return a boolean value.
 *
 * If the value is `true`, it's `executor` should run with the provided `args`
 * and return from the `guards` function.
 * If the value is `false`, the process continues to the next `validator`.
 *
 * When no `validator` succeeds, the default executor is run.
 */
function guard<Function extends Misc.VariadicFunction>(
  ...qualifiers: [...Misc.GuardQualifier<Function>[], Function]
): Function {
  return ((...args: Parameters<Function>) => {
    const length = qualifiers.length - 1;

    for (let index = 0; index < length; index += 1) {
      const [validator, expression] = (
        qualifiers as Misc.GuardQualifier<Function>[]
      )[index];

      if (validator(...args)) {
        return expression(...args);
      }
    }

    return (qualifiers[length] as Function)(...args);
  }) as Function;
}

// const issTring =(value: any): value is string => typeof  value === "string"

// const blah = guard(issTring)(cn)
