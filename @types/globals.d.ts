import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
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
