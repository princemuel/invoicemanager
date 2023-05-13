import type { Project } from '@src/@types';
import { Loader } from '@src/components';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { client } from '../client';
import { useAuthDispatch, useAuthState } from '../context';
import { usePersist, useRefreshAuthQuery } from '../hooks';
import { AuthError } from './error';

interface Props {}

const PersistLogin = (props: Props) => {
  const [persist] = usePersist();

  const auth = useAuthState();
  const dispatch = useAuthDispatch();

  const [trueSuccess, setTrueSuccess] = React.useState(false);

  const token = auth?.token;

  const refreshAuth = useRefreshAuthQuery(client, void 0, {
    enabled: !token && persist,
    retry: 1,
    onSuccess(data) {
      setTrueSuccess(true);
      dispatch('auth/addToken');
    },
    onError(err: Project.IErrorResponse) {
      err.response.errors.forEach(async (error) => {
        toast.error(error.message);
      });
    },
  });

  let content: JSX.Element = <></>;
  if (!persist) {
    // persist: no
    console.log('%c no persist', 'color: yellow;');
    content = <Outlet />;
  } else if (refreshAuth.isLoading) {
    //persist: yes, token: no
    console.log('%c loading', 'color: blue;');
    // add a loader here
    content = <Loader />;
  } else if (refreshAuth.isError) {
    //persist: yes, token: no
    console.log('%c error', 'color: red;');
    content = (
      <AuthError message={refreshAuth?.error?.response?.errors[0]?.message} />
    );
  } else if (refreshAuth.isSuccess && trueSuccess) {
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
