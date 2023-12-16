import { cx as clsx, type CxOptions } from "cva";
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

export function safeNum(value: any, defaultValue = 0): number {
  const num = Number(value);
  return (Number.isNaN(num) || isNaN(num)) && !Object.is(num, 0) ?
      defaultValue
    : num;
}

export function hasValues<T>(
  value: T[] | null | undefined,
): value is NonNullable<T[]> {
  return Array.isArray(value) && value.length > 0;
}

export function buildItemCountMsg(message: string) {
  return function (data: any[]) {
    const itemCount = data?.length || 0;
    const verb = itemCount === 1 ? "is" : "are";

    return message
      .replace("{{ verb }}", verb)
      .replace("{{ count }}", `${itemCount}`);
  };
}

export function singleton<T>(name: string, callback: () => T): NonNullable<T> {
  const g = globalThis as any;
  g.__singletons ??= new Map();

  if (!g.__singletons.has(name)) g.__singletons.set(name, callback());
  return g.__singletons.get(name);
}
