import { cn } from '@/helpers';
import { cva, type VariantProps } from 'class-variance-authority';
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
        className={cn(
          text({
            variant,
            modifier,
            size,
            weight,
            className,
          })
        )}
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
      default: 'text-brand-900 dark:text-white',
      primary: 'text-brand-400',
      secondary: 'text-brand-300',
      accent: 'text-[#858BB2]',
      brand: 'text-brand-500',
    },
    modifier: {
      inverted: 'text-white',
      'dark/50': 'text-black/50',
    },
    size: {
      xl: 'text-900 leading-800 -tracking-500',
      lg: 'text-700 leading-500 -tracking-300',
      md: 'text-600 leading-600 -tracking-400',
      sm: 'text-500 leading-400 -tracking-600',
      base: 'text-400 leading-200 -tracking-200',
      xs: 'text-300 leading-300 -tracking-300',
    },
    //////////// leaving this in case I need it later
    weight: {
      bold: 'font-bold',
      medium: 'font-medium',
      regular: 'font-normal',
      light: 'font-light',
    },
    ////////////
    uppercase: {
      true: 'uppercase',
    },
    disabled: {
      true: '',
    },
  },
  compoundVariants: [
    { size: ['sm', 'md', 'lg', 'xl'], className: 'font-bold' },
    {
      variant: ['primary', 'secondary', 'accent'],
      className: 'dark:text-brand-100',
    },
    {
      variant: ['default', 'primary', 'secondary', 'accent'],
      disabled: true,
      className: '!text-brand-500/20',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'base',
    weight: 'medium',
  },
});
