import InferNextPropsType from "infer-next-props-type";
import type { NextPage } from "next";
import type { AppContext, AppProps } from "next/app";
import { ParsedUrlQuery } from "querystring";
import type { ReactElement, ReactNode } from "react";

/*===============================*
          EVENT TYPES
 *===============================*
*/
export type ReactFormEvent = React.FormEvent<HTMLFormElement>;
export type ReactSelectEvent = React.ChangeEvent<HTMLSelectElement>;
export type ReactInputEvent = React.ChangeEvent<HTMLInputElement>;
export type ReactMouseEvent = React.MouseEvent<HTMLButtonElement>;

/*===============================*
          NEXTJS TYPES
 *===============================*
*/
export type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
export type { InferNextPropsType };
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
export type AppPropsWithLayout<P = any> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
} & {
  getInitialProps?: (context: AppContext) => AppProps<P> | Promise<AppProps<P>>;
};

export interface Params extends ParsedUrlQuery {
  id: string;
  status: string;
}

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
