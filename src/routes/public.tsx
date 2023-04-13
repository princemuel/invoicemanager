import { IUser } from '@src/@types';
import { useAuthDispatch } from '@src/context';
import { getErrorMessage } from '@src/helpers';
import { useGetUserQuery, useRefreshAuthQuery } from '@src/hooks';
import { client } from '@src/lib';
import { useNavigate } from 'react-router-dom';

type Props = {};

const PublicRoute = (props: Props) => {
  const datetime = new Date('2023-03-31T02:54:50.051Z');

  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const { data, refetch, status, error } = useGetUserQuery(
    client,
    {},
    {
      onSuccess(data) {
        dispatch({
          type: 'SET_USER',
          payload: {
            user: data.user as IUser,
          },
        });
      },
      onError(error: any) {
        error.response.errors.forEach(async (err: any) => {
          if ((err.message as string).includes('Not Authorised')) {
            try {
              const fetcher = useRefreshAuthQuery.fetcher(client);
              await fetcher();
              refetch();
            } catch (error) {
              console.log(error);
              navigate('/login');
            }
          }
        });
      },
    }
  );

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (status === 'error') {
    return <h1>Error: {JSON.stringify(getErrorMessage(error))}</h1>;
  }

  const user = data.user;

  return (
    <div>
      <h1>{`Welcome ${user?.email || 'User'}`}</h1>
    </div>
  );
};

export { PublicRoute };
