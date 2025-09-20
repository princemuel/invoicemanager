import { type CnOptions, cn } from "tailwind-variants";

export const tw = (...classes: CnOptions) => cn(...classes)({ twMerge: true });
