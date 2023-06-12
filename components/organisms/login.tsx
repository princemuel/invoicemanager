import { LoginFormSchema, RHFSubmitHandler, useZodForm } from '@/lib';
import { FormProvider } from 'react-hook-form';
import { Text } from '../atoms';
import { FormField } from '../molecules';

type Props = {};

const LoginForm = (props: Props) => {
  const methods = useZodForm({
    schema: LoginFormSchema,
    mode: 'onChange',
  });

  const onSubmit: RHFSubmitHandler<typeof LoginFormSchema> = async (data) => {
    try {
      const result = LoginFormSchema.safeParse(data);

      // The data is invalid
      if (!result.success) {
        console.error(result.error);
      }

      methods.reset();
    } catch (error) {
      console.error('LOGIN_ERROR', error);
    }
  };

  const isSubmittable =
    Boolean(methods.formState.isDirty) && Boolean(methods.formState.isValid);

  return (
    <FormProvider {...methods}>
      <form
        className='w-full max-w-[40rem] rounded-3xl bg-neutral-100 px-12 py-16 shadow-100 dark:bg-brand-600 max-md:mt-24'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <fieldset className='grid grid-cols-6 gap-8'>
          <Text as='legend' className='text-5xl font-normal tracking-300'>
            Login
          </Text>

          <FormField
            type='email'
            name='email'
            label={'Email Address'}
            className='col-span-6 mt-10'
            autoComplete='username'
          />

          <FormField
            type='password'
            name='password'
            label={'Password'}
            className='col-span-6'
            autoComplete='current-password'
            isPassword
          />

          <div className='col-span-6 mt-6'>
            <button
              type='submit'
              disabled={!isSubmittable}
              className='btn w-full border-none bg-accent-200 p-6 text-500 font-normal text-neutral-100 outline-none transition duration-500 hover:bg-accent-100 focus:bg-accent-100'
            >
              Login to your account
            </button>
          </div>

          <div className='col-span-6 flex items-center justify-center gap-4 text-500'>
            <Text>Don’t have an account?</Text>
            <Link href='/register' className='text-accent-200'>
              Sign Up
            </Link>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  );
};

export { LoginForm };
