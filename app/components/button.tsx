import { tw } from "@/helpers/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

type ButtonVariants = Omit<
  RequiredVariantProps<typeof buttonVariants>,
  "_content"
>;
type ButtonProps = Partial<ButtonVariants> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> & {
    asChild?: boolean;
    disabled?: boolean;
  };

/**
 * This component will render either a button or the child,
 * depending on the props that are passed to it. This make it ideal for
 * use as link as the button props are passed to the nested link.
 */

export const Button = forwardRef(
  (
    {
      variant,
      modifier,
      size,
      fullWidth,
      disabled,
      rounded,
      asChild,
      className,
      ...restProps
    },
    forwardedRef,
  ) => {
    const As = asChild ? Slot : "button";

    return (
      <As
        {...restProps}
        ref={forwardedRef}
        className={tw(
          buttonVariants({
            variant,
            modifier,
            size,
            fullWidth,
            disabled,
            rounded,
            className,
            _content: "text",
          }),
        )}
        disabled={disabled}
      />
    );
  },
) as ForwardRefComponent<"button", ButtonProps>;
Button.displayName = "Button";

export const buttonVariants = cva(
  [
    "group relative inline-flex items-center",
    "transition-colors duration-300 ease-in",
    "focus-visible:outline-none focus-visible:ring-1",
  ],
  {
    variants: {
      variant: {
        default: "",
        primary: "bg-brand-500 text-white hocus:bg-brand-200",
        secondary:
          "bg-accent-300 text-brand-300 hocus:bg-brand-900 dark:bg-accent-300 dark:text-brand-100 dark:hocus:bg-brand-700",
        soft: "bg-neutral-200 text-brand-400 hocus:bg-brand-100 dark:bg-brand-600 dark:text-brand-100 dark:hocus:bg-white dark:hocus:text-brand-400",
        destructive: "bg-accent-200 text-white hocus:bg-accent-100",
      },
      modifier: {
        plain: "border-none bg-transparent",
        outline: "border border-current bg-transparent",
      },
      size: {
        xs: "text-400 leading-200 -tracking-200",
        sm: "text-400 leading-200 -tracking-200",
      },
      rounded: {
        normal: "",
        full: "rounded-full",
      },
      _content: {
        text: "",
        textAndIcon: "",
        icon: "",
      },
      fullWidth: {
        true: "w-full",
      },
      disabled: {
        true: "pointer-events-none cursor-not-allowed opacity-50",
      },
    },
    compoundVariants: [
      //TODO: refactor this
      {
        variant: ["primary", "secondary", "soft", "destructive"],
        rounded: "normal",
        className: "justify-center rounded-pill",
      },
      { variant: ["default"], rounded: "normal", className: "rounded-md" },
      {
        size: ["sm"],
        _content: ["text", "textAndIcon"],
        className: "h-12 gap-x-2 font-bold",
      },
      {
        variant: ["soft", "destructive", "secondary"],
        size: ["sm"],
        _content: "text",
        className: "px-4",
      },
      {
        variant: ["primary"],
        size: ["sm"],
        // gap-x-1 w-20 h-11 px-2 sm:w-36 sm:gap-x-2 sm:h-12
        className: "px-2 sm:px-4",
      },
      {
        fullWidth: true,
        className: "justify-center text-center",
      },
      { disabled: true, variant: "default", className: "border-gray-200" },
    ],

    defaultVariants: {
      variant: "default",
      size: "sm",
      rounded: "normal",
      _content: "text",
    },
  },
);

type RequiredVariantProps<
  T extends (...args: any) => any,
  // By default, all variants will be required
  Keys extends keyof VariantProps<T> = keyof VariantProps<T>,
> = Simplify<
  // Create an intersection of all variants with those being marked as required
  VariantProps<T> & {
    // For each variant being marked as required, remove null and undefined
    [Variant in Keys]: Exclude<VariantProps<T>[Variant], null | undefined>;
  }
>;

type Simplify<ObjectType> = {
  [KeyType in keyof ObjectType]: ObjectType[KeyType];
} & {};
