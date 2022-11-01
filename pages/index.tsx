import { links } from 'common';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className='main-container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='flex items-center justify-between'>
          <Link href={'/'} passHref>
            <a>
              <span>{links?.logo}</span>
              <span className='sr-only'>Logo and Link</span>
            </a>
          </Link>
          <h1>Design System</h1>
        </div>

        <section>
          <h2 className='text-primary-500'>Colors</h2>
          {/* BOXES */}
          <div></div>
        </section>
        <section>
          <h2 className='text-primary-500'>Typography</h2>
          {/* TYPOGRAPHY */}
        </section>
        <section>
          <h2 className='text-primary-500'>Buttons</h2>
          {/* BUTTONS */}
        </section>
        <section>
          <h2 className='text-primary-500'>Form Elements Light</h2>
          {/* FORM ELEMENTS LIGHT */}
        </section>
        <section className='bg-primary-900 w-full-shadow'>
          <h2 className='text-primary'>Form Elements Dark</h2>
          {/* FORM ELEMENTS DARK */}
        </section>
      </main>
    </div>
  );
};

export default Home;
