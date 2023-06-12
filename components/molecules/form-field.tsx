import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { cx } from 'cva';
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
  isPassword?: boolean;
}

const FormField = ({
  name,
  isPassword,
  type,
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
    <FormControl as='div' className={cx('relative', className)}>
      <FormInput
        type={isPassword && isPasswordShown ? 'text' : type}
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

      {isPassword && (
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
      )}
    </FormControl>
  );
};

export { FormField };
