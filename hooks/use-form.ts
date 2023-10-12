'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { SubmitHandler, UseFormProps, useForm } from 'react-hook-form';
import * as z from 'zod';

// React Hook Form Types
export interface RHFormSubmitHandler<T extends z.ZodType<any, any, any>>
  extends SubmitHandler<z.infer<T>> {}

export function useZodForm<T extends z.ZodType<any, any, any>>(
  props: Omit<UseFormProps<T['_input']>, 'resolver'> & {
    schema: T;
  }
) {
  const { schema, ...rest } = props;

  return useForm<T['_input']>({
    ...rest,

    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      if (process.env.NODE_ENV !== 'production') {
        console.log('formData', data);
        console.log(
          'validation result',
          await zodResolver(schema, undefined, {
            raw: true,
          })(data, context, options)
        );
      }

      return zodResolver(schema, undefined, {
        raw: true,
      })(data, context, options);
    },
  });
}

export function useFormState<State extends Record<string, unknown>>(
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
