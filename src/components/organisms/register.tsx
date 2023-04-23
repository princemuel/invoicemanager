import { FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
// import clsx from 'clsx';
import { useAuthDispatch } from '@src/context';
import { RHFSubmitHandler, RegisterFormSchema, useZodForm } from '@src/helpers';
import { useRegisterMutation } from '@src/hooks';
import { client } from '@src/lib';
import { toast } from 'react-toastify';
import { Text } from '../atoms';
import { FormField } from '../molecules';

type Props = {};

const RegisterForm = (props: Props) => {
  const methods = useZodForm({
    schema: RegisterFormSchema,
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatchAuth = useAuthDispatch();

  const { mutate: register } = useRegisterMutation(client, {
    onSuccess(data) {
      dispatchAuth({
        type: 'SET_TOKEN',
        payload: {
          token: data.register?.token,
        },
      });
      dispatchAuth({
        type: 'SET_USER',
        payload: {
          user: data.register?.user,
        },
      });
      toast('User Registration Successfull', {
        type: 'success',
        position: 'top-right',
      });
      navigate('/');
    },
  });

  const onSubmit: RHFSubmitHandler<typeof RegisterFormSchema> = async (
    data
  ) => {
    try {
      const result = RegisterFormSchema.safeParse(data);
      // The data is invalid
      if (!result.success) {
        throw new Error(JSON.stringify(result.error));
      }
      console.log(data);
      register({ input: { email: data.email, password: data.password } });
      methods.reset();
    } catch (error) {
      console.error('REGISTER_ERROR', error);
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
            Register
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
            autoComplete='new-password'
          />

          <FormField
            type='password'
            name='countersign'
            label={'Confirm Password'}
            className='col-span-6'
            autoComplete='new-password'
          />

          <div className='col-span-6 mt-6'>
            <button
              type='submit'
              disabled={!isSubmittable}
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
    </FormProvider>
  );
};

export { RegisterForm };
