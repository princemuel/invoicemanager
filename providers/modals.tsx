import { LoginForm, RegisterForm } from '@/components';
import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: Props) => {
  return (
    <React.Fragment>
      <LoginForm />
      <RegisterForm />
      {children}
    </React.Fragment>
  );
};

export { ModalProvider };
