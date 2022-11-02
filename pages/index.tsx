import { LogoSVG } from 'common';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className='main-container'>
      <Head>
        <title>Invoice Notes</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='body-100'>
        <div className='flex items-center justify-between'>
          <Link href={'/'} passHref>
            <a>
              <span>
                <LogoSVG className='text-primary-500 dark:text-neutral-100' />
              </span>
              <span className='sr-only'>Logo and Link</span>
              {/* <Image
                src={'/assets/images/logo.svg'}
                alt='logo'
                width={'28'}
                height='26'
              /> */}
            </a>
          </Link>

          <h1>Invoice Notes</h1>
        </div>

        <div className='flex items-center justify-center'>
          <h2>This site is under construction</h2>
        </div>
        <div className='flex items-center justify-center text-accent-200'>
          <Link href={'/design'} passHref>
            <a>See the design system</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
