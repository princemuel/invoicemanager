import { FormProvider, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
// import clsx from 'clsx';
import { IUser } from '@src/@types';
import { useAuthDispatch } from '@src/context';
import { useGetUserQuery, useLoginMutation, useZodForm } from '@src/hooks';
import { client } from '@src/lib';
import { Text } from '../atoms';
import { FormInput } from '../molecules';

type Props = {};

const FormSchema = z.object({
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
});

type FormData = z.infer<typeof FormSchema>;

const LoginForm = (props: Props) => {
  const methods = useZodForm({
    schema: FormSchema,
  });

  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const { refetch } = useGetUserQuery(
    client,
    {},
    {
      onSuccess(data) {
        dispatch({
          type: 'SET_USER',
          payload: {
            user: data.user as IUser,
          },
        });
      },
    }
  );

  const { mutate: login } = useLoginMutation(client, {
    onSuccess(data) {
      console.log(data.login?.user);
      console.log(data.login?.accessToken);

      dispatch({
        type: 'SET_USER',
        payload: {
          user: data.login?.user!,
        },
      });

      refetch();
      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = FormSchema.safeParse(data);

    if (result.success) {
      console.log(data);
      login({ input: data });
      methods.reset();
    } else {
      // The data is invalid
      console.error(result.error);
    }
  };

  const isSubmittable =
    !!methods.formState.isDirty && !!methods.formState.isValid;

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

          <FormInput
            type='email'
            name='email'
            label={'Email Address'}
            className='col-span-6 mt-10'
            autoComplete='username'
          />

          <FormInput
            type='password'
            name='password'
            label={'Password'}
            className='col-span-6'
            autoComplete='new-password'
          />

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
