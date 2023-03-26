export const capitalize = (string: string) => {
  return string?.[0]?.toUpperCase() + string?.slice(1).toLowerCase();
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
