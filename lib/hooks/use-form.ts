'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { UseFormProps, useForm as useReactHookForm } from 'react-hook-form';
import { z } from 'zod';

export function useZodForm<T extends z.ZodType>(
  props: Omit<UseFormProps<T['_input']>, 'resolver'> & {
    schema: T;
  }
) {
  return useReactHookForm<T['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
      raw: true,
    }),
  });
}

export function useForm<State extends Record<string, unknown>>(
  initialState: State
) {
  const [values, setValues] = React.useState(() => initialState);

  const update = React.useCallback(
    <Key extends keyof State>(name: Key, value: State[Key]) => {
      setValues((fields) => ({ ...fields, [name]: value }));
    },
    []
  );

  return [values, update] as const;
}
