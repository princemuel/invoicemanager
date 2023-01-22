import {
  dehydrate,
  DehydrateOptions,
  QueryClient,
} from "@tanstack/react-query";

export const approximate = (number: number, to = 0) => {
  return parseInt(number.toFixed(to));
};
export const itemTotal = (quantity: number, price: number) => {
  return Number(price) * Number(quantity);
};

type Item = { quantity: number; price: number };
export const grandTotal = <T extends Item>(items?: T[]) => {
  if (!items) return 0;
  return items.reduce((total, item) => {
    total += itemTotal(item.quantity, item.price);
    return total;
  }, 0);
};

export function serialize<T>(data: T): NonNullable<T> {
  return JSON.parse(JSON.stringify(data));
}

export const createDehydratedState = (
  client: QueryClient,
  options: DehydrateOptions = {}
) => {
  if (!client) throw new Error("The query client must be defined");
  return serialize(dehydrate(client, options));
};

export const formatPrice = (price?: number) => {
  if (typeof price !== "number")
    throw new Error("The item's price must be of typeof 'number'");

  return Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "GBP",
  }).format(price);
};

type FormatDateFunction = (
  date?: string,
  formatOptions?: Intl.DateTimeFormatOptions[],
  separator?: string
) => string;

export const formatDate: FormatDateFunction = (
  date,
  formatOptions = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }],
  separator = " "
) => {
  if (typeof date !== "string")
    throw new Error("The date must be of type 'string'");

  return formatOptions
    .map((options) => {
      const dateFormatter = new Intl.DateTimeFormat("en", options);
      return dateFormatter.format(new Date(date));
    })
    .join(separator);
};

export function getMonth(string: string) {
  return string?.split(/(?<=^\S+)\s/)[1];
}
