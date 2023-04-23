import type { IUser } from '@src/@types';
import produce from 'immer';
import type { Dispatch, ReactNode } from 'react';
import * as React from 'react';

interface IAuthState {
  token?: string;
  user?: Partial<IUser>;
}

type IAuthAction =
  | {
      type: 'SET_USER';
      payload: { user?: Partial<IUser> };
    }
  | { type: 'SET_TOKEN'; payload: { token?: string } }
  | { type: 'LOGOUT_USER' };

const initialState: IAuthState = {
  token: undefined,
  user: undefined,
};

const reducer = produce((draft: IAuthState, action: IAuthAction) => {
  switch (action.type) {
    case 'SET_USER':
      draft.user = action.payload.user;
      break;
    case 'SET_TOKEN':
      draft.token = action.payload.token;
      break;
    case 'LOGOUT_USER':
      draft.token = undefined;
      draft.user = undefined;
      break;
    default: {
      //@ts-expect-error disable typescript error due to type "never"
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
});

const Store = React.createContext<IAuthState | undefined>(undefined);
const StoreDispatch = React.createContext<Dispatch<IAuthAction> | undefined>(
  undefined
);

type ProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: ProviderProps) => {
  let [state, dispatch] = React.useReducer(reducer, initialState);

  state = React.useMemo(() => state, [state]);
  dispatch = React.useMemo(() => dispatch, [dispatch]);

  return (
    <Store.Provider value={state}>
      <StoreDispatch.Provider value={dispatch}>
        {children}
      </StoreDispatch.Provider>
    </Store.Provider>
  );
};

export const useAuthState = () => {
  const context = React.useContext(Store);
  if (context == undefined)
    throw new Error('useAuthState must be used within a AuthProvider');

  React.useDebugValue(context.user, (user) =>
    user ? 'Logged In' : 'Logged Out'
  );

  return context;
};

export const useAuthDispatch = () => {
  const context = React.useContext(StoreDispatch);
  if (context == undefined)
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  return context;
};
