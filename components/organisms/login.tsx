'use client';

import type { RHFSubmitHandler } from '@/lib';
import {
  LoginFormSchema,
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
import { BaseModal } from '../molecules';

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
      if (!result.success) {
        throw result.error;
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
        <Dialog.Title as='legend' className={'text-5xl font-bold tracking-300'}>
          Login
        </Dialog.Title>

        <div className='col-span-6 mt-6'>
          <button
            type='submit'
            disabled={!isSubmittable}
            className='btn w-full border-none bg-accent-200 p-6 text-500 font-normal text-neutral-100 outline-none transition duration-500 hover:bg-accent-100 focus:bg-accent-100'
          >
            Login to your account
          </button>
        </div>
        {/*
        <ProviderButtons className='col-span-6 mt-6'>
          {(filtered) =>
            [...reverse(filtered)].map((provider, i) => (
              <Provider
                key={provider.name}
                provider={provider}
                icon={icons[i]}
              />
            ))
          }
        </ProviderButtons> */}

        <div className='col-span-6 flex items-center justify-center gap-4 text-500'>
          <Text>Don’t have an account?</Text>
          <button
            type='button'
            ref={focusRef}
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
