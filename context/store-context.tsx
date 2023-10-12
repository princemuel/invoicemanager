import * as React from 'react';

export const createStore = <T,>(initialState: T) => {
  type VoidCallback = (state: T) => void;

  let isInitialized = false;
  let currentState = initialState;
  const subscribers = new Set<VoidCallback>();

  return {
    getSnapshot: () => currentState,
    getServerSnapshot: () => currentState,
    setState: (newState: Partial<T>) => {
      currentState = { ...currentState, ...newState };
      subscribers.forEach((listener) => listener(currentState));
    },
    subscribe: (listener: (state: T) => void) => {
      subscribers.add(listener);
      return () => subscribers.delete(listener);
    },
    serverInitialize: (initialState: T) => {
      if (!isInitialized) {
        currentState = initialState;
        isInitialized = true;
      }
    },
  };
};

type StoreType<T> = ReturnType<typeof createStore<T>>;
type Select<T, SelectorOutput> = (state: T) => SelectorOutput;

export const useStore = <State, Store extends StoreType<State>, Snapshot>(
  store: Store,
  selector: Select<State, Snapshot>
): [Snapshot, (newState: Partial<State>) => void] => {
  const snapshot = React.useSyncExternalStore(
    store.subscribe,
    () => selector(store.getSnapshot()),
    () => selector(store.getServerSnapshot())
  );

  return [snapshot, store.setState];
};

// const ServerContext = React.createContext();

// type Props = {
//   children: React.ReactNode;
//   defaultState: T;
// };
// function Provider({ children, defaultState }: Props) {
//   return (
//     <ServerContext.Provider value={defaultState}>
//       {children}
//     </ServerContext.Provider>
//   );
// }

const store = createStore({
  num: 10,
});

// const blah = useStore(store,s =>  s.);
