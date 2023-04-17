import {
  dehydrate,
  DehydrateOptions,
  QueryClient,
} from '@tanstack/react-query';

export function approximate(number: number, fractionDigits = 0) {
  return parseInt(number.toFixed(fractionDigits));
}

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
  return !value || typeof 'value' !== 'number' || isNaN(value) ? 0 : value;
}

export function pluralize(value: number, word: string) {
  return value === 1 ? `${word}` : `${word}s`;
}

type Item = { quantity?: number; price?: number };
export function calculateTotal<T extends Item>(items?: T[]): number;
export function calculateTotal<T extends number>(quantity: T, price: T): number;
export function calculateTotal(a?: unknown, b?: unknown) {
  if (!a) return 0;

  if (Array.isArray(a)) {
    let total = 0;
    for (const item of a) {
      total +=
        parseNumSafe(Number(item.quantity)) * parseNumSafe(Number(item.price));
    }
    return total;
  }

  return parseNumSafe(Number(a)) * parseNumSafe(Number(a));
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
