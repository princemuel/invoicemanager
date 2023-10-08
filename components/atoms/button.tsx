'use client';

import { checkEnv, cn } from '@/helpers';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';
import * as React from 'react';

type ButtonVariants = Omit<RequiredVariantProps<typeof button>, '_content'>;

type ButtonProps = Partial<ButtonVariants> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
    asChild?: boolean;
    disabled?: boolean;
  };

/**
 * This component will render either a button or the child,
 * depending on the props that are passed to it. This make it ideal for
 * use as link as the button props are passed to the nested link.
 */

export const Button = React.forwardRef(
  (
    {
      variant,
      modifier,
      size,
      fullWidth,
      disabled,
      weight,
      rounded,
      uppercase,
      asChild,
      className,
      ...restProps
    },
    forwardedRef
  ) => {
    const As = asChild ? Slot : 'button';

    return (
      <As
        {...restProps}
        ref={forwardedRef}
        className={cn(
          button({
            variant,
            modifier,
            size,
            fullWidth,
            disabled,
            weight,
            rounded,
            uppercase,
            className,
            _content: 'text',
          })
        )}
        disabled={disabled}
      />
    );
  }
) as ForwardRefComponent<'button', ButtonProps>;
Button.displayName = 'Button';

type IconButtonProps = Omit<ButtonProps, 'children' | 'asChild'> &
  (
    | {
        icon: SVGComponent;
        hiddenLabel: string;
        leadingIcon?: never;
        trailingIcon?: never;
      }
    | {
        icon: never;
        hiddenLabel: never;
        leadingIcon?: SVGComponent;
        trailingIcon?: never;
      }
    | {
        icon: never;
        hiddenLabel: never;
        leadingIcon?: never;
        trailingIcon?: SVGComponent;
      }
  );

export const IconButton = React.forwardRef(
  (
    {
      as,
      icon: Icon,
      variant,
      modifier,
      size,
      fullWidth,
      disabled,
      weight,
      rounded,
      uppercase,
      hiddenLabel,
      children,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      className,
      ...restProps
    },
    forwardedRef
  ) => {
    checkEnv('development', () => {
      if (
        (LeadingIcon && TrailingIcon) ||
        (LeadingIcon && Icon) ||
        (TrailingIcon && Icon)
      ) {
        console.warn('You should only have a single icon in your button');
      }
    });

    const As = as || 'button';

    return (
      <As
        {...restProps}
        ref={forwardedRef}
        className={cn(
          button({
            variant,
            modifier,
            size,
            fullWidth,
            disabled,
            weight,
            rounded,
            uppercase,
            className,
            _content: LeadingIcon || TrailingIcon ? 'textAndIcon' : 'icon',
          })
        )}
        disabled={disabled}
      >
        {Icon ? (
          <>
            <p className='sr-only'>{hiddenLabel}</p>
            <Icon className='h-5 w-5' aria-hidden='true' />
          </>
        ) : null}

        {LeadingIcon ? (
          <LeadingIcon className='-ml-0.5 h-5 w-5' aria-hidden='true' />
        ) : null}

        {Icon ? null : children}

        {TrailingIcon ? (
          <TrailingIcon className='-mr-0.5 h-5 w-5' aria-hidden='true' />
        ) : null}
      </As>
    );
  }
) as ForwardRefComponent<'button', IconButtonProps>;
IconButton.displayName = 'Button';

const button = cva(
  [
    'relative group inline-flex items-center',
    'transition-colors duration-300',
    'focus-visible:outline-none focus-visible:ring-1',
  ],
  {
    variants: {
      variant: {
        default: '',
        primary:
          'bg-brand-500 text-white hover:bg-brand-300 focus:bg-brand-300',
        secondary:
          'bg-neutral-200 text-brand-400  hover:bg-brand-100 hover:text-brand-400 focus:bg-brand-100 focus:text-brand-400 dark:bg-brand-600 dark:text-brand-100 dark:hover:bg-white dark:hover:text-brand-400 dark:focus:bg-white dark:focus:text-brand-400',
        tertiary:
          'bg-accent-300 text-brand-300 hover:bg-brand-900 dark:text-brand-100 dark:hover:bg-accent-300',
        accent:
          'bg-neutral-200 text-brand-400 hover:bg-brand-100 focus:bg-brand-100 dark:bg-brand-600 dark:text-brand-300',
        // counter: 'text-black/25 hover:text-brand-500 focus:text-brand-500',
        // chevron:
        //   'gap-4 text-black/50 hover:animate-bounce hover:text-brand-500 active:text-brand-500',
        destructive: 'bg-accent-200 text-white hover:bg-accent-100',
        monochrome:
          'border border-black bg-white text-black hover:bg-black hover:text-white focus:bg-black focus:text-white',
      },

      modifier: {
        plain: 'border-none bg-transparent',
        outline: 'border border-current bg-transparent',
      },

      size: {
        // sm: 'px-7 py-5',
        // base: 'px-12 py-5',
        slim: 'text-400 leading-300 tracking-100',
        medium: 'text-sm',
        large: 'text-base',
      },
      weight: {
        bold: 'font-bold',
        medium: 'font-medium',
        regular: 'font-normal',
      },
      rounded: {
        small: 'rounded-lg',
        pill: 'rounded-pill',
        full: 'rounded-full',
      },
      _content: {
        text: '',
        textAndIcon: '',
        icon: '',
      },
      fullWidth: {
        true: 'w-full',
      },
      uppercase: {
        true: 'uppercase',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed opacity-50',
      },
    },
    compoundVariants: [
      {
        modifier: 'outline',
        variant: 'monochrome',
        className: 'text-white hover:text-neutral-200',
      },
      {
        modifier: ['outline', 'plain'],
        variant: 'primary',
        className:
          'hover:text-brand-500 active:text-brand-500 hover:bg-transparent focus:bg-transparent',
      },
      {
        modifier: ['outline', 'plain'],
        variant: 'secondary',
        className:
          'text-green-500 hover:bg-transparent focus:bg-transparent hover:text-green-600',
      },
      {
        modifier: ['outline', 'plain'],
        variant: 'destructive',
        className:
          'text-red-500 hover:bg-transparent focus:bg-transparent hover:text-red-600',
      },
      {
        size: 'slim',
        className: 'px-3 py-1',
      },
      {
        size: 'medium',
        className: 'px-8 py-3',
      },
      {
        // modifier: "",
        size: 'large',
        className: 'px-8 py-3',
      },
      {
        size: 'large',
        className: 'px-9 py-3',
      },
      { disabled: true, variant: 'default', className: 'border-gray-200' },
    ],

    defaultVariants: {
      variant: 'default',
      size: 'slim',
      weight: 'bold',
      rounded: 'pill',
      _content: 'text',
    },
  }
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
