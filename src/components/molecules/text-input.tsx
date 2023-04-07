import { useFormContext } from 'react-hook-form';
import { FormControl, FormErrorText, FormInput, FormLabel } from '../atoms';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label: string;
}

const TextInput = ({
  name,
  type,
  placeholder,
  label,
  autoComplete,
  className,
}: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl className={className}>
      <FormInput
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className=''
        autoComplete={autoComplete}
      />

      <div className='flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'>
        <FormLabel htmlFor={name} className=''>
          {label}
        </FormLabel>

        <FormErrorText id={name} className=''>{`${
          errors?.[name]?.message || ''
        }`}</FormErrorText>
      </div>
    </FormControl>
  );
};

export { TextInput };
