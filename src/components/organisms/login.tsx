import { Link } from 'react-router-dom';
import { Text } from '../atoms';

type Props = {};

const LoginForm = (props: Props) => {
  return (
    <form className='flex w-full max-w-[40rem] flex-col gap-10 rounded-3xl px-12 py-16 dark:bg-brand-700 max-md:mt-48'>
      <Text variant='h1' className='text-5xl font-normal tracking-300'>
        Login
      </Text>
      <div className=''>
        <label className='block'>
          <input
            name='email'
            type='email'
            placeholder='Email Address'
            className='peer w-full border-b border-solid border-brand-100/10 p-6 text-500 text-neutral-100 caret-accent-200 placeholder:text-neutral-100/50 focus:border-neutral-100  focus:outline-none'
            autoComplete='username'
          />
        </label>
      </div>

      <div>
        <label className='block'>
          <input
            name='password'
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
