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
      .email({ message: 'Invalid email address' })
      .min(1, { message: "Can't be empty" })
      .min(6, { message: 'Must be or more characters long' })
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(1, "Can't be empty")
      .min(8, { message: 'Must be 8 or more characters long' })
      .trim(),
    countersign: z.string().min(1, "Can't be empty").trim(),
  })
  .refine((data) => data.password === data.countersign, {
    path: ['countersign'],
    message: 'The passwords do not match',
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginForm = (props: Props) => {
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
      className='w-full max-w-[40rem] rounded-3xl bg-neutral-100 px-12 py-16 shadow-100 dark:bg-brand-600 max-md:mt-24'
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className='grid grid-cols-6 gap-8'>
        <Text as='legend' className='text-5xl font-normal tracking-300'>
          Register
        </Text>

        <div className='col-span-6 mt-10 flex flex-col-reverse gap-4'>
          <input
            {...register('email')}
            id='email'
            type='email'
            placeholder='Enter email address'
            className='body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-errormessage={'error-email'}
            autoComplete='username'
          />

          <div className='flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'>
            <label htmlFor='email' className='body-100'>
              Email
            </label>

            <Text
              as='span'
              role='alert'
              className='text-200 font-semibold leading-200 tracking-[-0.21px]'
              id='error-email'
              aria-live='assertive'
            >
              {errors?.email?.message}
            </Text>
          </div>
        </div>

        <div className='col-span-6 flex flex-col-reverse gap-4'>
          <input
            {...register('password')}
            type='password'
            id='password'
            placeholder='Enter password'
            className='body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-errormessage={'error-password'}
            autoComplete='new-password'
          />

          <div className='flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'>
            <label htmlFor='password' className='body-100'>
              Password
            </label>
            <Text
              as='span'
              role='alert'
              id='error-password'
              className='text-200 font-semibold leading-200 tracking-[-0.21px]'
              aria-live='assertive'
            >
              {errors?.password?.message}
            </Text>
          </div>
        </div>

        <div className='col-span-6 flex flex-col-reverse gap-4'>
          <input
            {...register('countersign')}
            id='countersign'
            type='password'
            placeholder='Repeat password'
            className='body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
            aria-invalid={errors.countersign ? 'true' : 'false'}
            aria-errormessage={'error-countersign'}
            autoComplete='new-password'
          />

          <div className='flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'>
            <label htmlFor='countersign' className='body-100'>
              Confirm Password
            </label>

            <Text
              as='span'
              role='alert'
              id='error-countersign'
              className='text-200 font-semibold leading-200 tracking-[-0.21px]'
              aria-live='assertive'
            >
              {errors?.countersign?.message}
            </Text>
          </div>
        </div>

        <div className='col-span-6 mt-6'>
          <button
            type='submit'
            // disabled={isSubmitting}
            className='btn w-full border-none bg-accent-200 p-6 text-500 font-normal text-neutral-100 outline-none transition duration-500 focus:bg-accent-100 hover:bg-accent-100'
          >
            Login to your account
          </button>
        </div>

        <div className='col-span-6 flex items-center justify-center gap-4 text-500'>
          <Text>Don’t have an account?</Text>
          <Link to='/register' className='text-accent-200'>
            Sign Up
          </Link>
        </div>
      </fieldset>
    </form>
  );
};

export { LoginForm };
