import { icons } from 'common';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const DesignSystem: NextPage = () => {
  return (
    <div className='main-container dark:bg-primary-900'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='body-100'>
        <div className='flex items-center justify-between'>
          <Link href={'/'} passHref>
            <a>
              <span>
                <icons.logo className='text-primary-500 dark:text-neutral-100' />
              </span>
              <span className='sr-only'>Logo and Link</span>
            </a>
          </Link>
          <h1>Design System</h1>
        </div>

        <section>
          <h2 className='text-primary-500'>Colors</h2>
          {/* BOXES */}
          <ul className='grid grid-cols-fit-big gap-y-12 gap-x-8 font-bold text-neutral-100'>
            <li className='rounded-default border border-solid border-primary-300 bg-neutral-200 py-16 px-10 text-primary-300 '>
              #F8F8FB
            </li>
            <li className='rounded-default bg-primary-100 py-16 px-10 text-primary-400 '>
              #DFE3FA
            </li>
            <li className='rounded-default bg-primary-200 py-16 px-10'>
              #9277FF
            </li>
            <li className='rounded-default bg-primary-300 py-16 px-10'>
              #888EB0
            </li>
            <li className='rounded-default bg-primary-400 py-16 px-10'>
              #7E88C3
            </li>
            <li className='rounded-default bg-primary-500 py-16 px-10'>
              #7C5DFA
            </li>
            <li className='rounded-default bg-primary-600 py-16 px-10'>
              #252945
            </li>
            <li className='rounded-default bg-primary-700 py-16 px-10'>
              #1E2139
            </li>
            <li className='rounded-default bg-primary-800 py-16 px-10'>
              #141625
            </li>
            <li className='rounded-default bg-primary-900 py-16 px-10'>
              #0C0E16
            </li>
            <li className='rounded-default bg-accent-100 py-16 px-10'>
              #FF9797
            </li>
            <li className='rounded-default bg-accent-200 py-16 px-10'>
              #EC5757
            </li>
          </ul>
        </section>
        <section>
          <h2 className='text-primary-500'>Typography</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi,
            rerum porro possimus, quas, libero ut numquam velit magni dolorum
          </p>
        </section>
        <section>
          <h2 className='text-primary-500'>Buttons</h2>

          <div className='grid grid-cols-fit-big gap-y-12 gap-x-8'>
            <div>
              <button type='button' className='btn btn-invoice'>
                <span className='grid place-content-center rounded-full bg-neutral-200 p-3'>
                  <icons.actions.add />
                </span>
                <span>New Invoice</span>
              </button>
            </div>
            <div>
              <button type='button' className='btn btn-paid'>
                Mark as Paid
              </button>
            </div>
            <div>
              <button type='button' className='btn btn-edit'>
                Edit
              </button>
            </div>

            <div>
              <button type='button' className='btn btn-draft'>
                Save as Draft
              </button>
            </div>
            <div>
              <button type='button' className='btn btn-delete'>
                Delete
              </button>
            </div>
            <div>
              <button type='button' className='btn btn-add'>
                &#43; Add New Item
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-primary-500 dark:bg-primary-900'>
            Form Elements Light
          </h2>
          {/* FORM ELEMENTS LIGHT */}
          <ul className='mb-8 grid gap-8 md:grid-cols-3'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
        <section className='w-full-shadow dark:bg-primary-900'>
          <h2 className='text-primary'>Form Elements Dark</h2>
          {/* FORM ELEMENTS DARK */}
          <div></div>
        </section>
      </main>
    </div>
  );
};

export default DesignSystem;
