import { IErrorResponse } from '@src/@types';
import { useAuthDispatch, useAuthState } from '@src/context';
import { useGetUserQuery, usePersist, useRefreshAuthQuery } from '@src/hooks';
import { client } from '@src/lib';
import React, { useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

interface Props {}

const PersistLogin = (props: Props) => {
  const [persist] = usePersist();
  const token = useAuthState().token;
  const dispatch = useAuthDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [trueSuccess, setTrueSuccess] = useState(false);

  const refreshAuth = useRefreshAuthQuery(
    client,
    {},
    {
      enabled: !token && persist,
      onSuccess(data) {
        setTrueSuccess(true);
        dispatch('auth/addToken');
      },
    }
  );

  const userQuery = useGetUserQuery(
    client,
    {},
    {
      enabled: trueSuccess,
      onSuccess: async (data) => {
        dispatch('auth/addUser');
      },
      onError(err: IErrorResponse) {
        err.response.errors.forEach(async (error) => {
          if ((error.message as string).includes('Not Authorised')) {
            try {
              refreshAuth.refetch();
              dispatch('auth/addToken');

              userQuery?.refetch();
            } catch (error) {
              navigate('/login');
            }
          }
        });
      },
    }
  );

  let content: JSX.Element | null = null;
  if (!persist) {
    // persist: no
    console.log('%c no persist', 'color: yellow;');
    content = <Outlet />;
  } else if (refreshAuth.status === 'loading') {
    //persist: yes, token: no
    console.log('%c loading', 'color: blue;');
    // add a loader here
    content = <h1>Loading...</h1>;
  } else if (refreshAuth.status === 'error') {
    //persist: yes, token: no
    console.log('%c error', 'color: red;');
    content = <Navigate to='/login' state={{ from: location }} replace />;
  } else if (refreshAuth.status === 'success' && trueSuccess) {
    //persist: yes, token: yes
    console.log('%c success', 'color: green;');
    content = <Outlet />;
  } else if (token && refreshAuth.fetchStatus === 'idle') {
    //persist: yes, token: yes
    console.log('%c Token and Uninitialized', 'color: pink;');
    console.log(refreshAuth.fetchStatus);
    content = <Outlet />;
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export { PersistLogin };
