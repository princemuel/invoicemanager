'use client';

import createHttpError from 'http-errors';
import Link from 'next/link';
import { useEffect } from 'react';

interface Props {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <article style={{ padding: '10rem' }}>
      <h1>Oops!</h1>
      <p>
        An error has occured:{' '}
        {(error instanceof Error && error.message) ||
          (error instanceof createHttpError.HttpError && error.message)}
      </p>
      <div className='flex items-center gap-8'>
        <button onClick={reset}>Try again</button> <span>Or</span>
        <Link href='/'>Go to the Homepage</Link>
      </div>
    </article>
  );
}
