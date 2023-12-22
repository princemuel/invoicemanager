import { cx as clsx, type CxOptions } from "class-variance-authority";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
        },
      ],
    },
  },
});

export function tw(...inputs: CxOptions) {
  return customTwMerge(clsx(inputs));
}

/*---------------------------------*
            STRING UTILS           *
  ---------------------------------*
 */

export function capitalize(string = "") {
  return string[0].toLocaleUpperCase() + string.slice(1).toLocaleLowerCase();
}

export const trim = (string = "") => string.trim();
export const omitFirstChar = (string = "") => string.slice(1);

export function pluralize(word: string, value: number) {
  return value === 1 ? `${word}` : `${word}s`;
}

export function truncate(str = "", length = str.length) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type EndsWith<W, S extends string> = W extends `${infer _}${S}` ? W : never;

export const endsWith = <Word extends string, Suffix extends string>(
  str: Word,
  suffix: Suffix,
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
  return (Number.isNaN(num) || isNaN(num)) && !Object.is(num, 0) ?
      defaultValue
    : num;
}

export function range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
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
  b?: T extends number ? NonNullable<T>
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends (infer _)[] ? "total"
  : never,
) {
  if (Array.isArray(a)) {
    return a.reduce((acc, item) => {
      const { total = 0, quantity = 0, price = 0 } = item;
      return b === "total" ? acc + total : acc + quantity * price;
    }, 0);
  }

  // bailout since the function expects 2 number params, or an array params
  return safeNum(a) * safeNum(b);
}

export const formatAmount = (price = 0, fractionDigits = 2) => {
  return Intl.NumberFormat("en-GB", {
    maximumFractionDigits: fractionDigits,
    style: "currency",
    currency: "GBP",
  }).format(price);
};

/*---------------------------------*
            ARRAY UTILS            *
  ---------------------------------*
 */

export function hasValues<T>(
  value: T[] | null | undefined,
): value is NonNullable<T[]> {
  return Array.isArray(value) && value.length > 0;
}

/*---------------------------------*
            OBJECT UTILS           *
  ---------------------------------*
 */

export function serialize<T>(data: T): NonNullable<T> {
  return JSON.parse(JSON.stringify(data));
}

export function singleton<T>(name: string, callback: () => T): NonNullable<T> {
  const g = globalThis as any;
  g.__singletons ??= new Map();

  if (!g.__singletons.has(name)) g.__singletons.set(name, callback());
  return g.__singletons.get(name);
}

/*---------------------------------*
            MISC                   *
  ---------------------------------*
 */

export function buildItemCountMsg(message: string) {
  return function (data: any[]) {
    const itemCount = data?.length || 0;
    const verb = itemCount === 1 ? "is" : "are";

    return message
      .replace("{{ verb }}", verb)
      .replace("{{ count }}", `${itemCount}`);
  };
}

export function monthsAgo(value: Date, distance = 0) {
  const datetime = value;
  datetime.setMonth(datetime.getMonth() - distance);
  return datetime;
}
