import * as React from 'react';

type Props = {
  loading: boolean;
  error: any;
  data: any;
  children: React.ReactNode;
};

/**
 * Query Results conditionally renders Apollo useQuery hooks states:
 * loading, error or its children when data is ready
 */
const QueryResult = ({ loading, error, data, children }: Props) => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    return (
      <section className='flex min-h-screen w-full items-center justify-center'>
        {/* <LoadingSpinner data-testid='spinner' size='large' theme='grayscale' /> */}
      </section>
    );
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};

export { QueryResult };
