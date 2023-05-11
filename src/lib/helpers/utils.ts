import type { Project } from '@src/@types';
import {
  DehydrateOptions,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

/*---------------------------------*
            STRING UTILS           *
  ---------------------------------*
 */

export function capitalize(string = '') {
  return string?.[0]?.toUpperCase() + string?.slice(1).toLowerCase();
}
export function trim(string = '') {
  return string?.trim();
}

export function removeFirstChar(string = '') {
  return string?.slice(1);
}
export function pluralize(word: string, value: number) {
  return value === 1 ? `${word}` : `${word}s`;
}

export function truncate(str = '', length = str.length) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
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

export function approximate(num = 0, fractionDigits = 0) {
  return Number.parseFloat(num.toFixed(fractionDigits));
}

export const isDraftInvoice = (
  invoice?: Project.Invoice
): invoice is Project.DraftInvoice => {
  return invoice?.status === 'DRAFT';
};

export const isPendingInvoice = (
  invoice?: Project.Invoice
): invoice is Project.PendingInvoice => {
  return invoice?.status === 'PENDING';
};

export const isPaidInvoice = (
  invoice?: Project.Invoice
): invoice is Project.PaidInvoice => {
  return invoice?.status === 'PAID';
};

export function range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

export function parseNumSafe(value: number) {
  return Number.isNaN(value) || isNaN(value) ? 0 : value;
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
  try {
    if (!a) throw new TypeError('The item or value is not defined');

    if (typeof a === 'number' && typeof b === 'number') {
      return approximate(a * b, 2);
    }

    return (a as Item[])?.reduce((total, current) => {
      if (b === 'total') {
        total += parseNumSafe(Number(current.total));
      } else {
        total +=
          parseNumSafe(Number(current.quantity)) *
          parseNumSafe(Number(current.price));
      }
      return approximate(total, 2);
    }, 0);
  } catch (e) {
    return 0;
  }
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

export function createDehydratedState(
  client: QueryClient,
  options: DehydrateOptions = {}
) {
  if (!client) throw new ReferenceError('The query client is undefined');
  return serialize(dehydrate(client, options));
}

export const objectKeys = <O extends {}>(object: O): (keyof O)[] => {
  return Object.keys(object) as (keyof O)[];
};

export function deepFreeze<T extends { [key: keyof any]: any }>(object: T) {
  if (object == null) throw new Error('data must be an object');
  // Retrieve the property names defined on object
  const propNames = Reflect.ownKeys(object);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];

    if ((value && typeof value === 'object') || typeof value === 'function') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

export function loggedMethod<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
) {
  const methodName = String(context.name);

  return function (this: This, ...args: Args): Return {
    console.log(`LOG: Entering method '${methodName}'.`);
    const result = target.call(this, ...args);
    console.log(`LOG: Exiting method '${methodName}'.`);
    return result;
  };
}

/*---------------------------------*
            ARRAY UTILS           *
  ---------------------------------*
 */

export function hasValues<T>(array: T[] | null | undefined) {
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

export function* sequence<T>(...iterables: Array<Iterable<T>>) {
  for (const iterable of iterables) {
    yield* iterable;
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

export const compose = <R, F extends (a: R, ...b: any[]) => R>(
  first: F,
  ...fns: ((a: R) => R)[]
) => {
  return fns.reduce((prev, next) => (value) => prev(next(value)), first) as F;
};

function* fibonacciSequence() {
  let x = 0;
  let y = 1;
  for (;;) {
    yield y;
    [x, y] = [y, x + y]; // Note: destructuring assignment
  }
}
// Return the nth Fibonacci number
function fibonacci(num: number) {
  for (const sequence of fibonacciSequence()) {
    if (num-- <= 0) return sequence;
  }
}

// const t0 = performance.now();
// console.log(fibonacci(38));
// const t1 = performance.now();
// console.log(`Call to fibonacci took ${t1 - t0} milliseconds.`);
