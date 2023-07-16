import { PrismaClient } from '@prisma/client';

export declare global {
  var prisma: PrismaClient | undefined;

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
