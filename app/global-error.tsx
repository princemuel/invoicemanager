'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <article style={{ padding: '10rem' }}>
      <h1>Oops!</h1>
      <p>An error has occured: {error instanceof Error && error.message}</p>
      <div className='flex items-center gap-8'>
        <button onClick={reset}>Try again</button> <span>Or</span>
        <Link href='/'>Go to the Homepage</Link>
      </div>
    </article>
  );
}
