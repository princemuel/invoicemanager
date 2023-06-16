'use client';

import type { RHFSubmitHandler } from '@/lib';
import {
  LoginFormSchema,
  reverse,
  useLoginModal,
  useRegisterModal,
  useZodForm,
} from '@/lib';
import { Dialog } from '@headlessui/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import toast from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Text } from '../atoms';
import { BaseModal, FormField, ProviderButtons } from '../molecules';

const icons = [FcGoogle, AiFillGithub];

interface Props {}

export const LoginForm = (props: Props) => {
  const router = useRouter();
  const login = useLoginModal();
  const signup = useRegisterModal();

  const [isLoading, setIsLoading] = React.useState(false);
  const focusRef = React.useRef<HTMLButtonElement>(null);

  const methods = useZodForm({
    schema: LoginFormSchema,
    mode: 'onChange',
  });

  const handleToggle = React.useCallback(() => {
    login.close();

    signup.open();
  }, [login, signup]);

  const onSubmit: RHFSubmitHandler<typeof LoginFormSchema> = async (data) => {
    try {
      const result = LoginFormSchema.safeParse(data);
      // The data is invalid
      if (!result.success) {
        throw new Error(JSON.stringify(result.error));
      }

      console.log(result.data);

      setIsLoading(true);

      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (response?.error) {
        throw response.error;
      }

      if (response?.ok) {
        toast.success('Login Success');
        router.refresh();
        login.close();
      }

      // methods.reset();
    } catch (ex) {
      if (ex instanceof Error) toast.error(ex.message);
      else toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmittable =
    Boolean(methods.formState.isDirty) && Boolean(methods.formState.isValid);

  return (
    <BaseModal
      show={login.show}
      onClose={login.close}
      methods={methods}
      onSubmit={onSubmit}
    >
      <fieldset className='grid grid-cols-6 gap-8'>
        <header className='flex items-center justify-between'>
          <Dialog.Title
            as='legend'
            className={'text-5xl font-bold tracking-300'}
          >
            Login
          </Dialog.Title>
        </header>

        <FormField
          type='email'
          name='email'
          label={'Email Address'}
          className='col-span-6'
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

        <div className='col-span-6'>
          <button
            type='submit'
            disabled={!isSubmittable}
            className='btn w-full rounded-pill border-none bg-accent-200 p-6 text-500 font-normal text-neutral-100 outline-none transition duration-500 hover:bg-neutral-100 hover:text-brand-500 focus:bg-neutral-100 focus:text-brand-500'
          >
            Login to your account
          </button>
        </div>

        <ProviderButtons className='col-span-6'>
          {(providers, icons, Provider) =>
            [...reverse(providers)].map((provider, i) => (
              <Provider
                key={provider.name}
                provider={provider}
                icon={icons[i]}
              />
            ))
          }
        </ProviderButtons>

        <div className='col-span-6 flex items-center justify-center gap-4 text-500'>
          <Text>Don’t have an account?</Text>
          <button
            type='button'
            className='text-accent-200'
            onClick={handleToggle}
          >
            Sign Up
          </button>
        </div>
      </fieldset>
    </BaseModal>
  );
};
