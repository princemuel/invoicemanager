import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';
import { capitalize } from '../helpers';

export function createStore<State>(initial: State, prefix: string) {
  interface StoreFactory {
    get: () => State;
    set: (value: Partial<State>) => void;
    subscribe: (onStoreChange: HasNoReturnValue) => HasNoReturnValue;
  }
  type HasNoReturnValue = () => void;

  function useStoreFactory(): StoreFactory {
    const store = useRef(initial);

    const get = useCallback(() => {
      return store?.current;
    }, []);

    const subscribers = useRef(new Set<HasNoReturnValue>());

    const set = useCallback((value: Partial<State>) => {
      store.current = { ...store?.current, ...value };
      subscribers?.current?.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: HasNoReturnValue) => {
      subscribers?.current?.add(callback);
      return () => subscribers?.current?.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  type StoreStateType = ReturnType<typeof useStoreFactory>['get'];
  type StoreSetterType = ReturnType<typeof useStoreFactory>['set'];
  type StoreSubscriberType = ReturnType<typeof useStoreFactory>['subscribe'];

  const STORE_NAME = capitalize(prefix || 'Store');

  const Store = createContext<StoreStateType | null>(null);
  const StoreSetter = createContext<StoreSetterType | null>(null);
  const StoreSubscriber = createContext<StoreSubscriberType | null>(null);

  Store.displayName = STORE_NAME + 'Context';

  type Props = {
    children: ReactNode;
  };

  const StoreProvider = ({ children }: Props) => {
    const { get, set, subscribe } = useStoreFactory();

    const memoizedGetter = useMemo(() => get, [get]);
    const memoizedSetter = useMemo(() => set, [set]);
    const memoizedSubscriber = useMemo(() => subscribe, [subscribe]);

    return (
      <Store.Provider value={memoizedGetter}>
        <StoreSetter.Provider value={memoizedSetter}>
          <StoreSubscriber.Provider value={memoizedSubscriber}>
            {children}
          </StoreSubscriber.Provider>
        </StoreSetter.Provider>
      </Store.Provider>
    );
  };

  function useStore<T>(
    selector: (store: State) => T
  ): [T, (value: Partial<State>) => void] {
    const get = useContext(Store);
    const set = useContext(StoreSetter);
    const subscribe = useContext(StoreSubscriber);

    if (get == null || subscribe == null || set == null)
      throw new Error(
        `use${STORE_NAME}Store must be used in a ${STORE_NAME}Provider`
      );
    const state = useSyncExternalStore(
      subscribe,
      () => selector(get()),
      () => selector(get())
    );

    return [state, set];
  }

  return [StoreProvider, useStore] as const;
}
