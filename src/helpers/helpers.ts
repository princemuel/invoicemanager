import {
  dehydrate,
  DehydrateOptions,
  QueryClient,
} from '@tanstack/react-query';

export function approximate(number: number, fractionDigits = 0) {
  return parseInt(number.toFixed(fractionDigits));
}
export function totalPrice(quantity = 0, price = 0) {
  return Number(price) * Number(quantity);
}

type Item = { quantity?: number; price?: number };
export function grandTotal<T extends Item>(items?: T[]) {
  if (!items) return 0;
  return items.reduce((total, item) => {
    total += totalPrice(item.quantity, item.price);
    return total;
  }, 0);
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
