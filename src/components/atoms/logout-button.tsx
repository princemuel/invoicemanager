import { Project } from '@src/@types';
import { client, useAuthDispatch, useLogoutQuery } from '@src/lib';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {}

const LogoutButton = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const queryClient = useQueryClient();

  const [shouldLogout, setShouldLogout] = useState(false);

  const { data } = useLogoutQuery(client, undefined, {
    enabled: shouldLogout,
    retry: false,

    //! Bad Code..I Know 🤭
    onSuccess(data) {
      setShouldLogout(false);
      toast.success(data.logout.message);
      dispatch('auth/logout');
      client.setHeader('authorization', `Bearer`);
      queryClient.clear();
      navigate('/login');
    },
    onError(error: Project.IErrorResponse) {
      setShouldLogout(false);
      dispatch('auth/logout');
      client.setHeader('authorization', `Bearer`);
      queryClient.clear();
      navigate('/login');
    },
  });

  return (
    <button
      type='button'
      onClick={() => {
        setShouldLogout(true);
      }}
    >
      Logout
    </button>
  );
};

export { LogoutButton };
