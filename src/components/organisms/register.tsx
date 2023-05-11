import type { Project } from '@src/@types';
import {
  RHFSubmitHandler,
  RegisterFormSchema,
  client,
  useRegisterMutation,
  useZodForm,
} from '@src/lib';
import { FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Text } from '../atoms';
import { FormField, FormFieldPassword } from '../molecules';
import { Loader } from './loader';

type Props = {};

const RegisterForm = (props: Props) => {
  const methods = useZodForm({
    schema: RegisterFormSchema,
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const { mutate: register, isLoading } = useRegisterMutation(client, {
    onSuccess(data) {
      toast.success(data.register?.message);
      navigate('/login');
    },
    onError(e: Project.IErrorResponse) {
      e.response.errors.forEach(async (error) => {
        toast.error(error.message);
      });
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
      register({ input: { email: data.email, password: data.password } });
      methods.reset();
    } catch (error) {
      console.error('REGISTER_ERROR', error);
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
            Register
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

          <FormFieldPassword
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
