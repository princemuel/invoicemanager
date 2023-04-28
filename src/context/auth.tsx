import produce from 'immer';
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useDebugValue,
  useMemo,
  useReducer,
} from 'react';
import type { IUser } from '../@types';
import { useGetUserQuery, useRefreshAuthQuery } from '../hooks';
import { client } from '../lib';

interface IAuthState {
  token?: string;
  user?: Partial<IUser>;
}

type IAuthAction = 'auth/addUser' | 'auth/addToken' | 'auth/logout';

const initialState: IAuthState = {
  token: undefined,
  user: undefined,
};

const AuthStore = createContext<IAuthState | undefined>(undefined);
const AuthStoreDispatch = createContext<Dispatch<IAuthAction> | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useAuth();

  const stateValue = useMemo(() => state, [state]);
  const dispatchValue = useMemo(() => dispatch, [dispatch]);

  return (
    <AuthStore.Provider value={stateValue}>
      <AuthStoreDispatch.Provider value={dispatchValue}>
        {children}
      </AuthStoreDispatch.Provider>
    </AuthStore.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStore);
  if (context == undefined)
    throw new Error('useAuthState must be used within a AuthProvider');

  useDebugValue(context.token ? 'Online' : 'Offline');

  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthStoreDispatch);
  if (context == undefined)
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  return context;
};

function useAuth() {
  const refreshAuthQuery = useRefreshAuthQuery(client, {});
  const userQuery = useGetUserQuery(
    client,
    {},
    { enabled: refreshAuthQuery.isSuccess }
  );

  const reducer = authReducer(
    userQuery?.data?.user,
    refreshAuthQuery?.data?.refreshAuth?.token
  );

  return useReducer(reducer, initialState);
}

function authReducer(user?: Partial<IUser>, token?: string) {
  return produce((draft: IAuthState, action: IAuthAction) => {
    switch (action) {
      case 'auth/addUser':
        draft.user = user;
        break;
      case 'auth/addToken':
        draft.token = token;
        break;
      case 'auth/logout':
        draft.token = undefined;
        draft.user = undefined;
        break;
      default: {
        throw new Error(`Unhandled action type: ${action}`);
      }
    }
  });
}
