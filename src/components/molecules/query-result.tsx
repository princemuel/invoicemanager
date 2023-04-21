import * as React from 'react';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../atoms';

type Props = {
  loading: boolean;
  error: any;
  data: any;
  children: React.ReactNode;
};

/**
 * The QueryResult component conditionally renders useQuery hook states:
 * loading, error or its children when data is ready
 */
const QueryResult = ({ loading, error, data, children }: Props) => {
  if (error) {
    toast.error(error.message);
    return <></>;
  }
  if (loading)
    return (
      // <section className='flex min-h-screen w-full items-center justify-center'>
      //   {/* <LoadingSpinner data-testid='spinner' size='large' theme='grayscale' /> */}
      // </section>

      <section className='flex min-h-screen w-full items-center justify-center'>
        <div className=''>
          <LoadingSpinner width={40} height={40} />
        </div>
      </section>
    );

  if (data) return <>{children}</>;

  return <></>;
};

export { QueryResult };
