import { AuthTemplate, LoginForm } from '@src/components';

type Props = {};

const LoginRoute = (props: Props) => {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};

export { LoginRoute };
