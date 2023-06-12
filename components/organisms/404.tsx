import Link from 'next/link';

const Missing = () => {
  return (
    <article style={{ padding: '10rem' }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div>
        <Link href='/'>Visit Our Homepage</Link>
      </div>
    </article>
  );
};
export { Missing };
