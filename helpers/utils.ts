type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

const filterBoolean = <T>(arg: T) => Boolean(arg) && typeof arg !== "boolean";
/**
 * This function returns classes based on conditions
 * that evaluate to true. It removes values that
 * evaluate to literal booleans, false, null and undefined.
 * @param args (string | boolean | null | undefined)[]
 * @returns string
 * @example clsx('base', undefined, ['more', 'classes'], hasError && 'bg-red', isEnabled || 'pointer-events-none', isTitle ? 'font-semibold' : 'font-normal')
 * @returns "base more classes bg-red font-normal"
 */
// (arg) => Boolean(arg) && typeof arg !== 'boolean'
export function clsx(...args: ClassValue[]) {
  return args.flat().filter(filterBoolean).join(" ").trim();
}

export const capitalize = (string: string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

export const trim = (string: string) => string?.trim();

export const removeFirstChar = (string: string) => {
  return string?.slice(1);
};

export const objectKeys = <O extends {}>(object: O): (keyof O)[] => {
  return Object.keys(object) as (keyof O)[];
};

export const hasValues = <T>(
  array: T[] | null | undefined
): array is NonNullable<T[]> => {
  return (array || []).length > 0;
};

export const shortName = (name: string) => {
  const lastIndexOfSpace = name?.indexOf(" ");
  return name?.substring(0, lastIndexOfSpace);
};

export const pipe = <T extends any[], R>(
  first: (...args: T) => R,
  ...fns: ((a: R) => R)[]
) => {
  const piped = fns.reduce(
    (prev, next) => (value: R) => next(prev(value)),
    (value) => value
  );
  return (...args: T) => piped(first(...args));
};

export const compose = <R, F extends (a: R, ...b: any[]) => R>(
  first: F,
  ...fns: ((a: R) => R)[]
) => {
  return fns.reduce((prev, next) => (value) => prev(next(value)), first) as F;
};

export function pluck<I, K extends keyof I>(items: I[], key: K): I[K][] {
  return items.map((item) => item[key]);
}

/**
 * A Generic Ranking Algorithm
 * @param items T
 * @param rank 'asc' | 'desc'
 * @returns An array containing the sorted items according to the ranking algorithm
 */

export const ranker = <T>(
  items: T[],
  rank: "asc" | "desc",
  callbackfn: (value: T) => number
): T[] => {
  return items
    .map((item) => ({
      item,
      rank: callbackfn(item),
    }))
    .sort((a, b) => (rank === "asc" ? a.rank - b.rank : b.rank - a.rank))
    .map((ranked) => ranked.item);
};
