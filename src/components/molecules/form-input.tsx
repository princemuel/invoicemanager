import { useFormContext } from 'react-hook-form';
import { FormControl, FormErrorText, FormInputBase, FormLabel } from '../atoms';

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

const FormInput = ({
  name,
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
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl as='div' className={className}>
      <FormInputBase
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={inputClassName}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
      />

      <div className='flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'>
        <FormLabel htmlFor={name} className={labelClassName}>
          {label}
        </FormLabel>
        <FormErrorText id={name} className={errorClassName}>
          {`${errors?.[name]?.message || ''}`}
        </FormErrorText>
      </div>
    </FormControl>
  );
};

export { FormInput };
