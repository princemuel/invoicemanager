import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Text } from '../atoms';

type Props = {};

const schema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters'),
});

type FormSchema = z.infer<typeof schema>;

const LoginForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  return (
    <form
      className='flex w-full max-w-[40rem] flex-col gap-6 rounded-3xl px-12 py-16 dark:bg-brand-700 max-md:mt-48'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text as='h1' className='text-5xl font-normal tracking-300'>
        Login
      </Text>

      <div className=''>
        <label className='block'>
          <input
            type='email'
            {...register('email')}
            placeholder='Email Address'
            className='peer w-full border-b border-solid border-brand-100/10 p-6 text-500 text-neutral-100 caret-accent-200 placeholder:text-neutral-100/50 focus:border-neutral-100  focus:outline-none'
            autoComplete='username'
          />
        </label>
      </div>

      <div>
        <label className='block'>
          <input
            {...register('password')}
            type='password'
            placeholder='Password'
            className='peer w-full border-b border-solid border-brand-100/10 bg-inherit p-6 text-500 text-neutral-100 caret-accent-200 placeholder:text-neutral-100/50 focus:border-neutral-100  focus:outline-none'
            autoComplete='current-password'
          />
        </label>
      </div>

      <div>
        <button
          type='submit'
          className='flex w-full items-center justify-center rounded-brand bg-accent-200 p-7 text-500 font-normal'
        >
          Login to your account
        </button>
      </div>

      <div className='flex items-center justify-center gap-4 text-500'>
        <Text>Don’t have an account?</Text>
        <Link to='/register' className='text-accent-200'>
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export { LoginForm };
