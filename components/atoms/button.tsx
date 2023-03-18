import { cva, VariantProps } from "class-variance-authority";
import { ButtonOrLink, Props as ButtonOrLinkProps } from "./button-or-link";

export interface Props
  extends ButtonOrLinkProps,
    VariantProps<typeof buttonStyles> {}

export function Button({ intent, fullWidth, children, ...props }: Props) {
  return (
    <ButtonOrLink className={buttonStyles({ intent, fullWidth })} {...props}>
      {children}
    </ButtonOrLink>
  );
}

const buttonStyles = cva(
  "inline-flex items-center disabled:pointer-events-none hover:bg-opacity-80",
  {
    variants: {
      intent: {
        primary: "",
        secondary: "",
        danger: "text-neutral-100 bg-accent-200 hover:bg-accent-100",
      },
      fullWidth: {
        true: "w-full",
      },
      size: {
        sm: "",
        lg: "",
      },
    },
    compoundVariants: [{}],
    defaultVariants: {
      intent: "primary",
    },
  }
);
