import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
// import clsx from 'clsx';
import { Text } from '../atoms';

type Props = {};

const FormSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email')
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have more than 8 characters')
      .trim(),
    countersign: z.string().min(1, 'Password confirmation is required').trim(),
  })
  .refine((data) => data.password === data.countersign, {
    path: ['countersign'],
    message: 'Passwords do not match',
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    await new Promise(async (resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve(undefined);
      }, 2000);
      reset();
    });
  };

  if (isSubmitting) console.log('SUBMITTING DATA');

  return (
    <form
      className='w-full max-w-[40rem] rounded-3xl bg-neutral-100 px-12 py-16 shadow-100 dark:bg-brand-600 max-md:mt-48'
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className='grid grid-cols-6 gap-8'>
        <Text variant='legend' className='text-5xl font-normal tracking-300'>
          Register
        </Text>

        <div className='relative col-span-6 mt-10'>
          <input
            {...register('email')}
            id='email'
            type='email'
            placeholder='Enter email address'
            className='body-100 peer mt-10 w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200  hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:focus:border-brand-500 dark:hover:border-brand-500'
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-errormessage={'error-email'}
            autoComplete='username'
          />

          <label
            htmlFor='email'
            className='body-100 absolute left-0 top-0 text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'
          >
            Email
          </label>

          <Text
            role='alert'
            className='absolute right-0 top-0 text-200 font-semibold leading-200 tracking-[-0.21px] peer-aria-[invalid="true"]:text-accent-200'
            id='error-email'
            aria-live='assertive'
          >
            {errors?.email?.message}
          </Text>
        </div>

        <div className='relative col-span-6'>
          <input
            {...register('password')}
            type='password'
            id='password'
            placeholder='Enter password'
            className='body-100 peer mt-10 w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200  hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:focus:border-brand-500 dark:hover:border-brand-500'
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-errormessage={'error-password'}
            autoComplete='new-password'
          />

          <label
            htmlFor='password'
            className='body-100 absolute left-0 top-0 text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'
          >
            Password
          </label>

          <Text
            role='alert'
            id='error-password'
            className='absolute right-0 top-0 text-200 font-semibold leading-200 tracking-[-0.21px] peer-aria-[invalid="true"]:text-accent-200'
            aria-live='assertive'
          >
            {errors?.password?.message}
          </Text>
        </div>

        <div className='relative col-span-6'>
          <input
            {...register('countersign')}
            id='countersign'
            type='password'
            placeholder='Repeat password'
            className='body-100 peer mt-10 w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200  hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:focus:border-brand-500 dark:hover:border-brand-500'
            aria-invalid={errors.countersign ? 'true' : 'false'}
            aria-errormessage={'error-countersign'}
            autoComplete='new-password'
          />

          <label
            htmlFor='countersign'
            className='body-100 absolute left-0 top-0 text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'
          >
            Confirm Password
          </label>

          <Text
            role='alert'
            id='error-countersign'
            className='absolute right-0 top-0 text-200 font-semibold leading-200 tracking-[-0.21px] peer-aria-[invalid="true"]:text-accent-200'
            aria-live='assertive'
          >
            {errors?.countersign?.message}
          </Text>
        </div>

        <div className='col-span-6'>
          <button
            type='submit'
            // disabled={isSubmitting}
            className='flex w-full items-center justify-center rounded-brand bg-accent-200 p-5 text-500 font-normal text-neutral-100'
          >
            Create an account
          </button>
        </div>

        <div className='col-span-6 flex items-center justify-center gap-4 text-500'>
          <Text>Already have an account?</Text>
          <Link to='/login' className='text-accent-200'>
            Login
          </Link>
        </div>
      </fieldset>
    </form>
  );
};

export { RegisterForm };
