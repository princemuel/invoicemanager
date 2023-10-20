'use client';

import * as React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

type State = {
  invoices: InvoiceTypeSafe[];
  filterTerm: Set<string>;
  filtered: InvoiceTypeSafe[];
};
type Action = { type: 'FILTER' } | { type: 'SET_FILTERS'; payload: string };

const FilterStateContext = createContext<State | null>(null);
const FilterDispatchContext =
  React.createContext<React.Dispatch<Action> | null>(null);

interface Props {
  children: React.ReactNode;
  defaultValue: InvoiceTypeSafe[];
}

export const FilterProvider = ({ children, defaultValue }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, {
    invoices: defaultValue,
    filterTerm: new Set([]),
    filtered: defaultValue,
  } satisfies State);

  const memoized = React.useMemo(() => state, [state]);

  return (
    <FilterStateContext.Provider value={memoized}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
};

export function useFilterTerm() {
  const context = useContextSelector(
    FilterStateContext,
    (state) => state?.filterTerm
  );
  if (context == null)
    throw new Error(
      'The `useFilterTerm` hook must be used in a `FilterProvider`'
    );

  return context;
}

export function useFilteredInvoices() {
  const context = useContextSelector(
    FilterStateContext,
    (state) => state?.filtered
  );
  if (context == null)
    throw new Error(
      'The `useFilteredInvoices` hook must be used in a `FilterProvider`'
    );

  return context;
}

export function useInvoices() {
  const context = useContextSelector(
    FilterStateContext,
    (state) => state?.invoices
  );
  if (context == null)
    throw new Error(
      'The `useFilteredInvoices` hook must be used in a `FilterProvider`'
    );

  return context;
}

export function useFilterDispatch() {
  const context = React.useContext(FilterDispatchContext);
  if (context == null)
    throw new Error(
      'The `useFilterDispatch` hook must be used in a `FilterProvider`'
    );

  return context;
}

////////////////////////////////
////////////////////////////////
///// ACTIONS
////////////////////////////////
////////////////////////////////
type FilterDispatch = ReturnType<typeof useFilterDispatch>;

export function filter(dispatch: FilterDispatch, payload: string) {
  dispatch({ type: 'SET_FILTERS', payload });
  dispatch({ type: 'FILTER' });
}

const filters = [
  { value: 'PAID' },
  { value: 'PENDING' },
  { value: 'DRAFT' },
] as const;

////////////////////////////////
////////////////////////////////
///// REDUCER
////////////////////////////////
////////////////////////////////
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_FILTERS': {
      const filter = action.payload.toLowerCase();
      const selected = new Set(state.filterTerm);

      !selected.has(filter) ? selected.add(filter) : selected.delete(filter);

      return {
        ...state,
        filterTerm: selected,
      };
    }

    case 'FILTER': {
      return {
        ...state,
        filtered: state.invoices.filter((invoice) => {
          const status = invoice.status || '';
          return state.filterTerm.size === 0 || state.filterTerm.has(status);
        }),
      };
    }

    default: {
      //@ts-expect-error
      throw new Error(`Unhandled action type ${action.type}`);
    }
  }
}
