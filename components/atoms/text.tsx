import { cn } from '@/helpers';
import { cva, type VariantProps } from 'cva';
import { forwardRef } from 'react';

interface TextVariants extends VariantProps<typeof text> {}

export const Text = forwardRef(
  (
    { as, variant, modifier, weight, size, className, children, ...restProps },
    forwardedRef
  ) => {
    const As = as || 'p';

    return (
      <As
        {...restProps}
        ref={forwardedRef}
        className={cn(text({ variant, modifier, size, weight, className }))}
      >
        {children}
      </As>
    );
  }
) as ForwardRefComponent<'p', TextVariants>;
Text.displayName = 'Text';

//////////////////////////////////////////
//////////////////////////////////////////
///     TEXT VARIANTS
//////////////////////////////////////////
//////////////////////////////////////////

const text = cva('', {
  variants: {
    variant: {
      default: 'text-black dark:text-white',
      brand: 'text-brand-500',
    },
    modifier: {
      inverted: 'text-white',
      'dark/50': 'text-black/50',
    },
    size: {
      'xx-small': 'text-200 leading-300 tracking-100',
      'x-small': 'text-300 leading-100 tracking-700',
      base: 'text-400 leading-300',
      small: 'text-500 leading-200 tracking-300',
      medium: 'text-600 leading-400 tracking-500',
      large: 'text-700 leading-600 tracking-600',
      xl: 'text-800 leading-500 tracking-200',
      '2xl': 'text-900 leading-700 tracking-400',
      '3xl': 'text-xl leading-800 tracking-600',
    },
    weight: {
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
    uppercase: {
      true: 'uppercase',
    },
  },
  compoundVariants: [
    {
      size: [
        // '3xl',
        // '2xl',
        // 'xl',
        // 'large',
        // 'medium',
        // 'small',
        // 'x-small',
        // 'xx-small',
      ],
      weight: 'bold',
      className: 'uppercase',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'base',
    weight: 'medium',
  },
});
