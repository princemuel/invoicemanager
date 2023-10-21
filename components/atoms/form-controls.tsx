import { cn } from '@/helpers';
import { forwardRef } from 'react';
import { Text } from './text';

export const TextField = forwardRef(
  ({ className, ...restProps }, forwardedRef) => {
    return (
      <>
        <input
          {...restProps}
          className={cn(
            'peer w-full rounded-[0.25rem] border border-brand-100 bg-transparent px-5 py-4 text-400 font-bold leading-200 -tracking-200 text-brand-900 caret-brand-500 outline-none autofill:bg-white aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 hover:border-brand-500 focus:border-brand-500 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 dark:border-brand-600 dark:bg-brand-700 dark:text-white dark:autofill:bg-brand-700 dark:hover:border-brand-500 dark:focus:border-brand-500',
            className
          )}
          ref={forwardedRef}
        />
      </>
    );
  }
) as ForwardRefComponent<'input', {}>;
TextField.displayName = 'TextField';

export const FormControl = forwardRef(
  ({ as, className, children, ...restProps }, forwardedRef) => {
    const RenderedElement = as || 'div';

    return (
      <RenderedElement
        {...restProps}
        className={cn('group flex flex-col-reverse gap-3', className)}
        ref={forwardedRef}
      >
        {children}
      </RenderedElement>
    );
  }
) as ForwardRefComponent<'div', {}>;
FormControl.displayName = 'FormControl';

export const FormLabel = forwardRef(
  ({ as, className, children, ...restProps }, forwardedRef) => {
    return (
      <Text
        as='label'
        {...restProps}
        className={cn('!text-current', className)}
        ref={forwardedRef}
      >
        {children}
      </Text>
    );
  }
) as ForwardRefComponent<'label', {}>;
FormLabel.displayName = 'FormLabel';

interface FormHelperTextProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {}

export const FormHelperText = ({
  className,
  children,
  ...restProps
}: FormHelperTextProps) => {
  return (
    <Text
      as='p'
      role='alert'
      {...restProps}
      className={cn('!text-current', className)}
    >
      {children}
    </Text>
  );
};
