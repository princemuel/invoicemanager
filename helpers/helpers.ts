import {
  dehydrate,
  DehydrateOptions,
  QueryClient,
} from "@tanstack/react-query";

export const approximate = (number: number, fractionDigits = 0) => {
  return parseInt(number.toFixed(fractionDigits));
};
export const totalPrice = (quantity = 0, price = 0) => {
  return Number(price) * Number(quantity);
};

type Item = { quantity?: number; price?: number };
export const grandTotal = <T extends Item>(items?: T[]) => {
  if (!items) return 0;
  return items.reduce((total, item) => {
    total += totalPrice(item.quantity, item.price);
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
  if (!client) throw new ReferenceError("The query client must be defined");
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
  if (!date || typeof date !== "string") {
    // throw new TypeError(
    //   `The date must not be of type '${typeof date}' but of type 'string'`
    // );
    date = new Date().toISOString();
  }

  return formatOptions
    .map((options) => {
      const dateFormatter = new Intl.DateTimeFormat("en", options);
      return dateFormatter.format(new Date(date as string));
    })
    .join(separator);
};

export function getMonth(string: string) {
  return string?.split(/(?<=^\S+)\s/)[1];
}
