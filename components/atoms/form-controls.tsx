import { cn } from '@/helpers';
import { forwardRef } from 'react';
import { Text } from './text';

export const TextField = forwardRef(({ className, ...rest }, forwardedRef) => {
  const classNa = cn('     ', className);
  return (
    <>
      <input
        className={cn(
          'peer w-full rounded-lg border border-brand-100 bg-transparent px-5 py-4 text-400 font-bold leading-200 -tracking-200 text-brand-900 caret-brand-500 outline-none autofill:bg-white aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 hover:border-brand-500 focus:border-brand-500 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 dark:border-brand-600 dark:bg-brand-700 dark:text-white dark:autofill:bg-brand-700 dark:hover:border-brand-500 dark:focus:border-brand-500',
          className
        )}
        {...rest}
        ref={forwardedRef}
      />
    </>
  );
}) as ForwardRefComponent<'input', {}>;
TextField.displayName = 'TextField';

export const FormControl = <E extends React.ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: ElementProps<E>) => {
  const RenderedElement = as || 'div';

  return (
    <RenderedElement
      className={cn('group flex flex-col-reverse gap-3', className)}
      {...rest}
    >
      {children}
    </RenderedElement>
  );
};

interface LabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

export function FormLabel({ className, children, ...rest }: LabelProps) {
  return (
    <Text as='label' className={cn('!text-current', className)} {...rest}>
      {children}
    </Text>
  );
}

interface FormHelperTextProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {}

export const FormHelperText = ({
  className,
  children,
  ...rest
}: FormHelperTextProps) => {
  return (
    <Text
      as='p'
      role='status'
      aria-live='polite'
      // text-accent-200
      className={cn('!text-current', className)}
      {...rest}
    >
      {children}
    </Text>
  );
};
