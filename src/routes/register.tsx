import { AuthTemplate, RegisterForm } from '@src/components';

type Props = {};

const RegisterRoute = (props: Props) => {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
};

export { RegisterRoute };
