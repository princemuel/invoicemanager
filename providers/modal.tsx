'use client';

import {
  ClientOnly,
  CreateInvoiceForm,
  LoginForm,
  RegisterForm,
} from '@/components';
import { useModalsss } from '@/lib';
import * as React from 'react';

interface Props {
  children: React.ReactNode;
  userId: string;
}

const ModalssProvider = ({ children, userId }: Props) => {
  const { dispatch, current } = useModalsss();

  dispatch({
    type: 'modal:register',
    payload: { name: 'login', Component: <LoginForm /> },
  });
  dispatch({
    type: 'modal:register',
    payload: { name: 'register', Component: <RegisterForm /> },
  });
  dispatch({
    type: 'modal:register',
    payload: {
      name: 'create-invoice',
      Component: <CreateInvoiceForm userId={userId} />,
    },
  });
  dispatch({
    type: 'modal:register',
    payload: { name: 'login', Component: <LoginForm /> },
  });
  return (
    <ClientOnly>
      {current && modals?.[current]}
      {children}

      {children}
    </ClientOnly>
  );
};

export { ModalssProvider };
