import * as React from 'react';

export const createStore = <T,>(initialState: T) => {
  type VoidCallback = (state: T) => void;

  // type StateType = ReturnType<typeof getStoreState>;
  function getStoreState() {
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
  }

  const ServerContext = React.createContext<T | null>(null);

  type Props = {
    children: React.ReactNode;
    defaultState: T;
  };

  function Provider({ children, defaultState }: Props) {
    return (
      <ServerContext.Provider value={defaultState}>
        {children}
      </ServerContext.Provider>
    );
  }

  type Select<SelectorOutput> = (state: T) => SelectorOutput;
  const useStore = <Snapshot,>(selector: Select<Snapshot>) => {
    const store = getStoreState();

    const snapshot = React.useSyncExternalStore(
      store.subscribe,
      () => selector(store.getSnapshot()),
      () => selector(store.getServerSnapshot())
    );

    return [snapshot, store.setState] as const;
  };

  const initialize = getStoreState().serverInitialize;

  return [Provider, useStore, initialize] as const;
};

const [NameProvider, useName, initializeName] = createStore({
  firstName: 'Sam',
  lastName: 'Chukwuzube',
});
