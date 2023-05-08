import { IErrorResponse } from '@src/@types';
import { client, useAuthDispatch, useLogoutQuery } from '@src/lib';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const LogoutButton = (props: Props) => {
  const queryClient = useQueryClient();

  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const { refetch } = useLogoutQuery(
    client,
    {},
    {
      enabled: false,
      onSuccess(data) {
        dispatch('auth/logout');
        queryClient.clear();
        navigate('/login');
      },
      onError(error: IErrorResponse) {
        dispatch('auth/logout');
        queryClient.clear();
        navigate('/login');
      },
    }
  );

  const logout = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <button type='button' onClick={logout}>
      LogoutButton
    </button>
  );
};

export { LogoutButton };
