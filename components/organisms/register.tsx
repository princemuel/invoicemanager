'use client';
import type { RHFSubmitHandler } from '@/lib';
import {
  RegisterFormSchema,
  reverse,
  useLoginModal,
  useRegisterModal,
  useZodForm,
} from '@/lib';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import toast from 'react-hot-toast';
import { Text } from '../atoms';
import { BaseModal, FormField, ProviderButtons } from '../molecules';

interface Props {}

export const RegisterForm = (props: Props) => {
  const router = useRouter();
  const login = useLoginModal();
  const signup = useRegisterModal();

  const [isLoading, setIsLoading] = React.useState(false);
  const focusRef = React.useRef<HTMLButtonElement>(null);

  const methods = useZodForm({
    schema: RegisterFormSchema,
    mode: 'onChange',
  });

  const handleToggle = React.useCallback(() => {
    signup.close();

    login.open();
  }, [login, signup]);

  const onSubmit: RHFSubmitHandler<typeof RegisterFormSchema> = async (
    data
  ) => {
    try {
      const result = RegisterFormSchema.safeParse(data);
      // The data is invalid
      if (!result.success) {
        throw new Error(JSON.stringify(result.error));
      }

      setIsLoading(true);

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok && response.status !== 200) {
        throw new Error(response.statusText);
      }

      toast.success('User Registered');
      methods.reset();

      signup.close();
      login.open();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : JSON.stringify(error)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmittable =
    Boolean(methods.formState.isDirty) && Boolean(methods.formState.isValid);

  return (
    <BaseModal
      show={signup.show}
      onClose={signup.close}
      methods={methods}
      onSubmit={onSubmit}
    >
      <fieldset className='grid grid-cols-6 gap-8'>
        <header className='flex items-center justify-between'>
          <Dialog.Title
            as='legend'
            className={'text-5xl font-bold tracking-300'}
          >
            Register
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
          autoComplete='new-password'
          isPassword
        />

        <FormField
          type='password'
          name='countersign'
          label={'Confirm Password'}
          className='col-span-6'
          autoComplete='new-password'
          isPassword
        />

        <div className='col-span-6'>
          <button
            type='submit'
            disabled={!isSubmittable}
            className='btn w-full rounded-pill border-none bg-accent-200 p-6 text-500 font-normal text-neutral-100 outline-none transition duration-500 hover:bg-neutral-100 hover:text-brand-500 focus:bg-neutral-100 focus:text-brand-500'
          >
            Create an account
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
          <Text>Already have an account?</Text>
          <button
            type='button'
            className='text-accent-200'
            onClick={handleToggle}
          >
            Login
          </button>
        </div>
      </fieldset>
    </BaseModal>
  );
};
