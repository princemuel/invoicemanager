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
      <main className='body-100'>
        <div className='flex items-center justify-between'>
          <Link href={'/'} passHref>
            <a>
              <span className=''>{links?.logo}</span>
              <span className='sr-only'>Logo and Link</span>
            </a>
          </Link>
          <h1>Design System</h1>
        </div>

        <section>
          <h2 className='text-primary-500'>Colors</h2>
          {/* BOXES */}
          <ul className='grid grid-cols-fit-big gap-8 text-neutral-100 font-bold'>
            <li className='py-16 px-10 rounded-2xl text-primary-300 bg-neutral-200 '>
              #F8F8FB
            </li>
            <li className='py-16 px-10 rounded-2xl text-primary-400 bg-primary-100 '>
              #DFE3FA
            </li>
            <li className='py-16 px-10 rounded-2xl bg-primary-200'>#9277FF</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-300'>#888EB0</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-400'>#7E88C3</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-500'>#7C5DFA</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-600'>#252945</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-700'>#1E2139</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-800'>#141625</li>
            <li className='py-16 px-10 rounded-2xl bg-primary-900'>#0C0E16</li>
            <li className='py-16 px-10 rounded-2xl bg-accent-100'>#FF9797</li>
            <li className='py-16 px-10 rounded-2xl bg-accent-200'>#EC5757</li>
          </ul>
        </section>
        <section>
          <h2 className='text-primary-500'>Typography</h2>
          {/* TYPOGRAPHY */}
          <div></div>
        </section>
        <section>
          <h2 className='text-primary-500'>Buttons</h2>
          {/* BUTTONS */}
          <div></div>
        </section>

        <section>
          <h2 className='text-primary-500'>Form Elements Light</h2>
          {/* FORM ELEMENTS LIGHT */}
          <div></div>
        </section>
        <section className='bg-primary-900 w-full-shadow'>
          <h2 className='text-primary'>Form Elements Dark</h2>
          {/* FORM ELEMENTS DARK */}
          <div></div>
        </section>
      </main>
    </div>
  );
};

export default Home;
