declare global {
  interface ObjectConstructor {
    entries<T extends {}>(object: T): ReadonlyArray<Misc.Entry<T>>;
  }

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
