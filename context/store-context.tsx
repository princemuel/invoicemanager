import * as React from 'react';

export function createNewStore<State>(
  initialState: State,
  displayName = 'Store'
) {
  const StateContext = React.createContext<StateType | null>(null);
  const ServerContext = React.createContext<any | null>(null);

  StateContext.displayName = displayName;
  ServerContext.displayName = displayName;

  type Select<SelectorOutput> = (state: State) => SelectorOutput;

  function useStoreContext<Snapshot>(selector: Select<Snapshot>) {
    const store = React.useContext(StateContext);
    const serverContext = React.useContext(ServerContext);

    if (store == null)
      throw new Error(
        `use${StateContext.displayName} must be used within a ${StateContext.displayName}Provider`
      );

    const state = React.useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(serverContext)
    );

    return [state, store.set] as const;
  }

  type Props<T> = {
    children: React.ReactNode;
    serverState: T;
  };

  function Provider<T>({ children, serverState }: Props<T>) {
    const store = useStoreState();
    const value = React.useMemo(() => store, [store]);

    return (
      <ServerContext.Provider value={serverState}>
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
      </ServerContext.Provider>
    );
  }

  type StateType = ReturnType<typeof useStoreState>;

  function useStoreState() {
    let isInitialized = false;

    const store = React.useRef(initialState);
    const subscribers = React.useRef(new Set<VoidFunction>());

    const get = React.useCallback(() => store?.current, []);

    const set = React.useCallback((value: Partial<State>) => {
      store.current = { ...store?.current, ...value };
      subscribers?.current?.forEach((listener) => listener());
    }, []);

    const serverInitialize = (initialState: State) => {
      if (!isInitialized) {
        store.current = initialState;
        isInitialized = true;
      }
    };

    const subscribe = React.useCallback(
      (listener: VoidFunction): VoidFunction => {
        subscribers?.current?.add(listener);
        return () => {
          subscribers?.current?.delete(listener);
        };
      },
      []
    );

    return {
      get,
      set,
      subscribe,
      serverInitialize,
    } as const;
  }

  return [Provider, useStoreContext] as const;
}

const [NameProvider, useName] = createNewStore({
  first: 'John',
  last: 'Doe',
});
