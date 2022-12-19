type IClsx = (...args: Array<undefined | null | string | boolean>) => string;

/**
 *
 * @param args (string | boolean | null | undefined)[]
 * @returns string
 * @example clsx('base', undefined, ['more', 'classes'], hasError && 'bg-red', isEnabled || 'pointer-events-none', isTitle ? 'font-semibold' : 'font-normal')
 * @returns "base more classes bg-red font-normal"
 */
export const clsx: IClsx = (...args) =>
  trim(
    args
      .flat()
      .filter(
        (arg) => arg !== null && arg !== undefined && typeof arg !== 'boolean'
      )
      .join(' ')
  );

export const capitalize = (string: string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

export const trim = (string: string) => string?.trim();

export function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export const removeFirstChar = (string: string) => {
  return string?.slice(1);
};

export const isNotEmptyArray = <T>(
  array: T[] | undefined
): array is NonNullable<T[]> => {
  return (array || []).length > 0;
};

export const shortName = (name: string) => {
  const lastIndexOfSpace = name?.indexOf(' ');
  return name?.substring(0, lastIndexOfSpace);
};

export const compose =
  (...fns: any[]) =>
  (res: any) =>
    fns.reduce((accum, next) => next(accum), res);

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
  rank: 'asc' | 'desc',
  callbackfn: (value: T) => number
): T[] => {
  return items
    .map((item) => ({
      item,
      rank: callbackfn(item),
    }))
    .sort((a, b) => (rank === 'asc' ? a.rank - b.rank : b.rank - a.rank))
    .map((ranked) => ranked.item);
};
