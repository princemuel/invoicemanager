export declare global {
  interface GlobalReducerActions {}
}

type GlobalReducer<IState> = (
  state: IState,
  action: {
    [ActionType in keyof GlobalReducerActions]: {
      type: ActionType;
    } & GlobalReducerActions[ActionType];
  }[keyof GlobalReducerActions]
) => IState;

export declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
