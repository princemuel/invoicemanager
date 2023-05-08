import { IErrorResponse } from '@src/@types';
import { icons } from '@src/common';
import { client, useLoginMutation, usePersist } from '@src/lib';
import {
  LoginFormSchema,
  RHFSubmitHandler,
  useZodForm,
} from '@src/lib/helpers';
import { FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Text } from '../atoms';
import { FormField, FormFieldPassword } from '../molecules';
import { Loader } from './loader';

type Props = {};

const LoginForm = (props: Props) => {
  const [persist, setPersist] = usePersist();
  const methods = useZodForm({
    schema: LoginFormSchema,
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const { mutate: login, isLoading } = useLoginMutation(client, {
    onSuccess(data) {
      toast.success('Login Successful');
      navigate('/');
    },
    onError(e: IErrorResponse) {
      e.response.errors.forEach(async (error) => {
        toast.error(error.message);
      });
    },
  });

  const onSubmit: RHFSubmitHandler<typeof LoginFormSchema> = async (data) => {
    try {
      const result = LoginFormSchema.safeParse(data);

      // The data is invalid
      if (!result.success) {
        console.error(result.error);
      }

      login({ input: data });
      methods.reset();
    } catch (error) {
      console.error('LOGIN_ERROR', error);
    }
  };

  const isSubmittable =
    Boolean(methods.formState.isDirty) && Boolean(methods.formState.isValid);

  if (isLoading) return <Loader />;

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

          <FormFieldPassword
            name='password'
            label={'Password'}
            className='col-span-6'
            autoComplete='new-password'
          />

          <button
            type='button'
            className='group col-span-6 flex items-center gap-6'
            aria-pressed={persist}
            onClick={setPersist}
          >
            <span className='inline-grid aspect-square w-[1.6rem] place-items-center rounded-[0.2rem] border  border-brand-400/25 bg-brand-100 group-hover:border-brand-500 group-aria-pressed:bg-brand-500 dark:bg-brand-700 dark:group-aria-pressed:bg-brand-500'>
              <img
                src={icons.actions.check}
                className='hidden group-aria-pressed:block'
                alt=''
              />
            </span>

            <span className='body-100'>Keep me logged in</span>
          </button>

          <div className='col-span-6 mt-6'>
            <button
              type='submit'
              disabled={!isSubmittable}
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
    </FormProvider>
  );
};

export { LoginForm };
