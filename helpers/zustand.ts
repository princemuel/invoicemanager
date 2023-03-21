import { StoreApi, UseBoundStore } from "zustand";

type WithSelectors<Store> = Store extends { getState: () => infer T }
  ? Store & { use: { [Prop in keyof T]: () => T[Prop] } }
  : never;

export const createSelectors = <Store extends UseBoundStore<StoreApi<object>>>(
  _store: Store
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let key of Object.keys(store.getState())) {
    (store.use as any)[key] = () =>
      store((selector) => selector[key as keyof typeof selector]);
  }

  return store;
};
