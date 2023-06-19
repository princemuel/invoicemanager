import {
  ClientOnly,
  CreateInvoiceForm,
  LoginForm,
  RegisterForm,
} from '@/components';
import * as React from 'react';

interface Props {
  children: React.ReactNode;
  userId: string;
}

const ModalProvider = ({ children, userId }: Props) => {
  return (
    <ClientOnly>
      <LoginForm />
      <RegisterForm />
      <CreateInvoiceForm userId={userId} />
      {children}
    </ClientOnly>
  );
};

export { ModalProvider };
