import { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<Store> = Store extends { getState: () => infer T }
  ? Store & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <Store extends UseBoundStore<StoreApi<object>>>(
  _store: Store
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let key of Object.keys(store.getState())) {
    (store.use as any)[key] = () => store((s) => s[key as keyof typeof s]);
  }

  return store;
};
