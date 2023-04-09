import { FormProvider, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
// import clsx from 'clsx';
import { useAuthDispatch } from '@src/context';
import { useRegisterMutation, useZodForm } from '@src/hooks';
import { client } from '@src/lib';
import { Text } from '../atoms';
import { FormInput } from '../molecules';

type Props = {};

const FormSchema = z
  .object({
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
    message: "Oops! The entered passwords don't match",
  });

type FormData = z.infer<typeof FormSchema>;

const RegisterForm = (props: Props) => {
  const methods = useZodForm({
    schema: FormSchema,
  });

  const navigate = useNavigate();
  const dispatchAuth = useAuthDispatch();

  const { mutate: create } = useRegisterMutation(client, {
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    const result = FormSchema.safeParse(data);

    if (result.success) {
      create({ input: { email: data.email, password: data.password } });
      methods.reset();
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
            Register
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

          <FormInput
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
