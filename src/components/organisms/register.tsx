import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
// import clsx from 'clsx';
import { useAuthDispatch } from '@src/context';
import { useRegisterMutation } from '@src/hooks';
import { client } from '@src/lib';
import { Text } from '../atoms';

type Props = {};

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "Can't be empty" })
      .min(2, { message: 'Must be more than 2 characters' })
      .trim(),
    lastName: z
      .string()
      .min(1, { message: "Can't be empty" })
      .min(2, { message: 'Must be more than 2 characters' })
      .trim(),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(1, { message: "Can't be empty" })
      .min(6, { message: 'Must more than 6 characters' })
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(1, "Can't be empty")
      .min(8, 'Must be more than 8 characters')
      .max(32, 'Must be less than 32 characters')
      .trim(),
    countersign: z.string().min(1, "Can't be empty").trim(),
  })
  .refine((data) => data.password === data.countersign, {
    path: ['countersign'],
    message: 'The passwords do not match',
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
  const navigate = useNavigate();
  const dispatchAuth = useAuthDispatch();

  const { data, mutate: createUser } = useRegisterMutation(client, {
    onSuccess(data) {
      console.log(data.register?.user);
      console.log(data.register?.accessToken);
      dispatchAuth({
        type: 'SET_TOKEN',
        payload: {
          token: data.register?.accessToken!,
        },
      });

      dispatchAuth({
        type: 'SET_USER',
        payload: {
          user: data.register?.user!,
        },
      });
      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data);

    const { firstName, lastName, email, password } = data;

    if (firstName && lastName && email && password) {
      createUser({ input: { firstName, lastName, email, password } });
      reset();
    }
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
            {...register('firstName')}
            id='firstName'
            type='text'
            className='body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
            aria-invalid={errors.firstName ? 'true' : 'false'}
            aria-errormessage={'error-firstName'}
            autoComplete='given-name'
          />

          <div className='flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'>
            <label htmlFor='firstName' className='body-100'>
              First Name
            </label>

            <Text
              as='span'
              role='alert'
              className='text-200 font-semibold leading-200 tracking-[-0.21px]'
              id='error-firstName'
              aria-live='assertive'
            >
              {errors?.firstName?.message}
            </Text>
          </div>
        </div>

        <div className='col-span-6 flex flex-col-reverse gap-4'>
          <input
            {...register('lastName')}
            id='lastName'
            type='text'
            className='body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
            aria-invalid={errors.lastName ? 'true' : 'false'}
            aria-errormessage={'error-lastName'}
            autoComplete='family-name'
          />

          <div className='flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:!text-accent-200 dark:text-brand-300'>
            <label htmlFor='lastName' className='body-100'>
              Last Name
            </label>

            <Text
              as='span'
              role='alert'
              className='text-200 font-semibold leading-200 tracking-[-0.21px]'
              id='error-lastName'
              aria-live='assertive'
            >
              {errors?.lastName?.message}
            </Text>
          </div>
        </div>

        <div className='col-span-6 flex flex-col-reverse gap-4'>
          <input
            {...register('email')}
            id='email'
            type='email'
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
            className='btn w-full border-none bg-accent-200 p-6 text-500 font-normal text-neutral-100 outline-none transition duration-500 focus:bg-neutral-100 focus:text-brand-500 hover:bg-neutral-100 hover:text-brand-500'
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
