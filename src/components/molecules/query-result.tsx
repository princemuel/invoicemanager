import type { IErrorResponse, Immutable } from '@src/@types';
import * as React from 'react';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../atoms';

interface Props<T> {
  loading: boolean;
  error: unknown;
  data: T;
  children: React.ReactNode;
}

/**
 * The QueryResult component conditionally renders useQuery hook states:
 * loading, error or its children when data is ready
 */
const QueryResult = <T extends Immutable<any>>({
  loading,
  error,
  data,
  children,
}: Props<T>) => {
  if (error) {
    (error as IErrorResponse).response.errors.forEach((err) => {
      if (err.message.includes('Authorised'))
        toast.error('Something unexpected happened. Please try again.');
      else toast.error(err.message);
    });
    return <React.Fragment />;
  }

  if (loading)
    return (
      <section className='flex min-h-screen w-full items-center justify-center'>
        <div className=''>
          <LoadingSpinner data-testid='spinner' width={40} height={40} />
          {/* <LoadingSpinner data-testid='spinner' size='large' theme='grayscale' /> */}
        </div>
      </section>
    );

  if (!data) return <React.Fragment />;

  return <React.Fragment>{children}</React.Fragment>;
};

export { QueryResult };
