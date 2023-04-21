import { useAuthState } from '@src/context';
import { useNavigate } from 'react-router-dom';

type Props = {};

const PublicRoute = (props: Props) => {
  const navigate = useNavigate();
  const auth = useAuthState();

  const user = auth?.user;

  return (
    <div>
      <h1>{`Welcome User with ${user?.email}`}</h1>
    </div>
  );
};

export { PublicRoute };
