import type {
  DraftInvoice,
  Invoice,
  PaidInvoice,
  PendingInvoice,
} from '@src/@types';
import {
  DehydrateOptions,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

/*---------------------------------*
            STRING UTILS           *
  ---------------------------------*
 */

export const capitalize = (string: string) => {
  return string?.[0]?.toUpperCase() + string?.slice(1).toLowerCase();
};
export const trim = (string: string) => string?.trim();

export const removeFirstChar = (string: string) => {
  return string?.slice(1);
};
export function pluralize(value: number, word: string) {
  return value === 1 ? `${word}` : `${word}s`;
}

/*---------------------------------*
            NUMBER UTILS           *
  ---------------------------------*
 */

export function approximate(number: number, fractionDigits = 0) {
  return parseInt(number.toFixed(fractionDigits));
}

export const isDraftInvoice = (invoice: Invoice): invoice is DraftInvoice => {
  return invoice.status === 'DRAFT';
};

export const isPendingInvoice = (
  invoice: Invoice
): invoice is PendingInvoice => {
  return invoice.status === 'PENDING';
};

export const isPaidInvoice = (invoice: Invoice): invoice is PaidInvoice => {
  return invoice.status === 'PAID';
};

export function range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
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

export function parseNumSafe(value: number) {
  return Number.isNaN(value) || isNaN(value) ? 0 : value;
}

interface Item {
  quantity?: number;
  price?: number;
}

export function calculateTotal<T extends Item>(items?: T[]): number;
export function calculateTotal<T extends number>(quantity: T, price: T): number;
export function calculateTotal(a?: unknown, b?: unknown) {
  try {
    if (!a) throw new TypeError('The item or value is not defined');

    if (typeof a === 'number' && typeof b === 'number') {
      return a * b;
    }

    return (a as Item[])?.reduce((total, current) => {
      total +=
        parseNumSafe(Number(current.quantity)) *
        parseNumSafe(Number(current.price));

      return total;
    }, 0);
  } catch (e) {
    return 0;
  }
}

export function serialize<T>(data: T): NonNullable<T> {
  return JSON.parse(JSON.stringify(data));
}

export function createDehydratedState(
  client: QueryClient,
  options: DehydrateOptions = {}
) {
  if (!client) throw new ReferenceError('The query client must be defined');
  return serialize(dehydrate(client, options));
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

export const noop = () => {};

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

export const isBrowser = typeof window !== 'undefined';

export const isNavigator = typeof navigator !== 'undefined';

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

export function hasValues<T>(array: T[] | null | undefined) {
  return (array || []).length > 0;
}

export function map<T>(
  iterable: Iterable<T>,
  cb: (...args: any) => T
): IterableIterator<T> {
  let iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<T> {
      let next = iterator.next();
      return next.done ? next : { value: cb(next.value) };
    },
  };
}

export function filter<T>(
  iterable: Iterable<T>,
  predicate: (...args: any) => boolean
) {
  let iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<T, boolean> {
      for (;;) {
        let next = iterator.next();
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
  let iterator = iterable[Symbol.iterator]();
  while (n-- > 0) {
    let next = iterator.next();
    if (next.done) return;
    else yield next.value;
  }
}

export function* zip<T>(...iterables: Array<Iterable<T>>) {
  let iterators = iterables.map((iterator) => iterator[Symbol.iterator]());
  let idx = 0;
  while (iterators.length > 0) {
    if (idx >= iterators.length) {
      idx = 0;
    }
    let next = iterators[idx].next();
    if (next.done) {
      iterators.splice(idx, 1);
    } else {
      yield next.value;
      idx++;
    }
  }
}

export function* sequence<T>(...iterables: Array<Iterable<T>>) {
  for (let iterable of iterables) {
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
  for (let sequence of fibonacciSequence()) {
    if (num-- <= 0) return sequence;
  }
}

// const t0 = performance.now();
// console.log(fibonacci(38));
// const t1 = performance.now();
// console.log(`Call to fibonacci took ${t1 - t0} milliseconds.`);
