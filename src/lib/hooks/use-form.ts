import * as React from 'react';

export function useForm<T extends Record<string, unknown>>(initialState: T) {
  const [values, setValues] = React.useState(() => initialState);

  const update = React.useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      setValues((fields) => ({ ...fields, [name]: value }));
    },
    []
  );

  return [values, update] as const;
}
