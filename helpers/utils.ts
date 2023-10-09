import { cx, type CxOptions as ClassArgs } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  classGroups: {
    'font-size': [
      { text: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    ],
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
  return (
    string?.[0]?.toLocaleUpperCase() + string?.slice(1).toLocaleLowerCase()
  );
}
export function trim(string = '') {
  return string?.trim();
}

export function omitFirstChar(string = '') {
  return string?.slice(1);
}
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

export function approximate(num = 0, fractionDigits = 0) {
  return Number.parseFloat(num.toFixed(fractionDigits));
}

export const isDraftInvoice = (invoice?: InvoiceTypeSafe) => {
  return invoice?.status === 'DRAFT';
};

export const isPendingInvoice = (invoice?: InvoiceTypeSafe) => {
  return invoice?.status === 'PENDING';
};

export const isPaidInvoice = (invoice?: InvoiceTypeSafe) => {
  return invoice?.status === 'PAID';
};

export function range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

export function safeNum<T>(value: T) {
  const updated = Number(value);
  return Number.isNaN(updated) || isNaN(updated) ? 0 : updated;
}

interface Item {
  quantity?: number;
  price?: number;
  total?: number;
}

export function calculateTotal<T extends Item>(
  items?: T[],
  params?: 'total'
): number;
export function calculateTotal<T extends number>(quantity: T, price: T): number;
export function calculateTotal(a?: unknown, b?: unknown) {
  if (!a) return 0;

  if (typeof a === 'number' && typeof b === 'number') {
    return approximate(a * b, 2);
  }

  if (Array.isArray(a)) {
    return (a as Item[]).reduce((total, current) => {
      if (b === 'total') {
        total += safeNum(current?.total);
      } else {
        total += safeNum(current?.quantity) * safeNum(current?.price);
      }
      return approximate(total, 2);
    }, 0);
  }

  return 0;
}

export function formatPrice(price = 0) {
  if (typeof price !== 'number')
    throw new Error("The item's price must be of typeof 'number'");

  return Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'GBP',
  }).format(price);
}

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

/*---------------------------------*
            ARRAY UTILS            *
  ---------------------------------*
 */

export function hasValues<T>(
  array: T[] | null | undefined
): array is NonNullable<T[]> {
  return (array || []).length > 0;
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
