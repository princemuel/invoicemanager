import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useReducer } from 'react';
import { FormControl, FormErrorText, FormInput, FormLabel } from '../atoms';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const FormFieldPassword = ({
  name,
  placeholder,
  label,
  defaultValue,
  autoComplete,
  className,
  labelClassName,
  inputClassName,
  errorClassName,
}: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useReducer(
    (prev) => !prev,
    false
  );

  return (
    <FormControl as='div' className={clsx('relative', className)}>
      <FormInput
        type={isPasswordShown ? 'text' : 'password'}
        name={name}
        id={name}
        placeholder={placeholder}
        className={inputClassName}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
      />

      <div className='flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'>
        <FormLabel htmlFor={name} className={labelClassName} children={label} />
        <FormErrorText id={name} className={errorClassName} />
      </div>

      <button
        type='button'
        onClick={setIsPasswordShown}
        className='absolute right-0 top-[56%] mr-6'
      >
        {isPasswordShown ? (
          <EyeSlashIcon className='aspect-square w-7 text-brand-500' />
        ) : (
          <EyeIcon className='aspect-square w-7 text-brand-500' />
        )}
        <span className='sr-only'>View Password</span>
      </button>
    </FormControl>
  );
};

export { FormFieldPassword };
