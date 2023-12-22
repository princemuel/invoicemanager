import { tw } from "@/helpers/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const label = cva([
  "text-brand-400 dark:text-brand-100 ",
  "text-400 font-medium leading-200 -tracking-200",
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
]);

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof label>
>(({ className, ...restProps }, forwardedRef) => (
  <LabelPrimitive.Root
    ref={forwardedRef}
    className={tw(label({ className }))}
    {...restProps}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;
