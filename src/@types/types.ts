import * as React from 'react';

declare global {
  interface GlobalReducerActions {}
}

export type GlobalReducer<IState> = (
  state: IState,
  action: {
    [ActionType in keyof GlobalReducerActions]: {
      type: ActionType;
    } & GlobalReducerActions[ActionType];
  }[keyof GlobalReducerActions]
) => IState;

type ElementProps<E extends React.ElementType<any>> = {
  children: React.ReactNode;
  variant?: E;
};

export type Props<E extends React.ElementType<any>> = ElementProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof ElementProps<E>>;
