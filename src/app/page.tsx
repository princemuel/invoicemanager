import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { getAuthSession } from './_data/lib';
import { Button, Container, Text } from '@/components';

export default function Home() {
  const { authenticated, user } = getAuthSession();

  return (
    <main
      className='flex min-h-screen w-full flex-col items-center justify-between gap-40 bg-white font-accent'
      aria-labelledby='home-heading'
    >
      <header>
        <Container>
          <div className='flex items-center gap-4'>
            {!authenticated ? (
              <>
                <LoginLink
                  className='inline-flex h-12 items-center rounded bg-blue-700 px-4 text-sm font-medium tracking-200'
                  // postLoginRedirectURL='/'
                  orgCode={process.env.KINDE_ORG_CODE}
                >
                  Login
                </LoginLink>
                <RegisterLink
                  className='inline-flex h-12 items-center rounded bg-accent-200 px-4 text-sm font-medium tracking-200'
                  // postLoginRedirectURL='/'
                  orgCode={process.env.KINDE_ORG_CODE}
                >
                  Sign Up
                </RegisterLink>
              </>
            ) : (
              <>
                <LogoutLink className='inline-flex h-12 items-center rounded bg-accent-200 px-4 text-sm font-medium tracking-200'>
                  Logout
                </LogoutLink>
              </>
            )}
          </div>
        </Container>
      </header>
      <section className=''>
        <Container>
          <div className='flex flex-col items-center gap-5 text-center md:items-start md:text-left'>
            <h1
              id='home-heading'
              className='text-4xl font-medium -tracking-[0.1px] text-brand-800'
            >
              A Simple Invoice Manager
            </h1>

            <p className='text-lg font-normal text-brand-800/50'>
              A clean and simple interface to organize your favourite websites.
              Open a new browser tab and see your sites load instantly. Try it
              for free.
            </p>

            <button className='inline-flex h-12 items-center rounded bg-blue-700 px-4 text-sm font-medium tracking-200'>
              Contact Us
            </button>
          </div>
        </Container>

        <div></div>
      </section>

      <Container>
        <section
          aria-labelledby='features'
          className='flex max-w-xl flex-col gap-5 text-center'
        >
          <h2
            id='features'
            className='text-3xl font-medium -tracking-[0.1px] text-brand-800'
          >
            Features
          </h2>

          <p className='text-lg font-normal text-brand-800/50'>
            Our aim is to make it quick and easy for you to access your
            favourite websites. Your invoices sync between your devices so you
            can access them on the go.
          </p>
        </section>
      </Container>

      <Container>
        <section aria-labelledby='organize' className=''>
          <header className='flex flex-col items-center gap-5 text-center md:items-start md:text-left'>
            <h2
              id='organize'
              className='text-3xl font-medium -tracking-[0.1px] text-brand-800'
            >
              Supercharge your workflow
            </h2>

            <p className='text-lg font-normal text-brand-800/50'>
              Organize your invoices however you like. Our simple drag-and-drop
              interface gives you complete control over how you manage your
              favourite sites.
            </p>

            <button className='inline-flex h-12 items-center rounded bg-blue-700 px-4 text-sm font-medium tracking-200'>
              More Info
            </button>
          </header>
        </section>
      </Container>

      <Container>
        <section
          aria-labelledby='download'
          className='flex max-w-xl flex-col gap-5 text-center'
        >
          <h2
            id='download'
            className='text-3xl font-medium -tracking-[0.1px] text-brand-800'
          >
            Download the extension
          </h2>

          <p className='text-lg font-normal text-brand-800/50'>
            We&apos;ve got more browsers in the pipeline. Please do let us know
            if you&apos;ve got a favourite you&apos;d like us to prioritize.
          </p>
        </section>
      </Container>

      <Container>
        <section
          aria-labelledby='faqs'
          className='flex max-w-xl flex-col gap-5 text-center'
        >
          <h2
            id='faqs'
            className='text-3xl font-medium -tracking-[0.1px] text-brand-800'
          >
            Frequently Asked Questions
          </h2>

          <p className='text-lg font-normal text-brand-800/50'>
            Here are some of our FAQs. If you have any other questions
            you&apos;d like answered please feel free to email us.
          </p>
        </section>
      </Container>

      <footer className='w-full' aria-labelledby='footer'>
        <section className='bg-blue-700 py-20'>
          <Container>
            <div className='mx-auto flex max-w-sm flex-col items-center gap-8 text-center'>
              <q className='text-sm uppercase -tracking-[0.1px] text-white'>
                35,000+ already joined
              </q>

              <h2
                id='footer'
                className='text-3xl font-medium -tracking-[0.1px] text-white'
              >
                Stay up-to-date with what we&apos;re doing
              </h2>

              <form className='flex items-center gap-4'>
                <label className='flex-1'>
                  <input
                    type='text'
                    autoComplete='email'
                    placeholder='Enter your email address'
                    className='h-12 w-full rounded bg-white px-4 text-sm tracking-200 text-brand-800 outline-none placeholder:text-brand-800/25'
                  />
                </label>

                <button
                  type='submit'
                  className='inline-flex h-12 items-center rounded bg-accent-200 px-4 text-sm font-medium tracking-200'
                >
                  Contact Us
                </button>
              </form>
            </div>
          </Container>
        </section>

        <section className='bg-brand-600 py-10'>
          <Container></Container>
        </section>
      </footer>
      {/* <div>
        {!isAuthenticated ? (
          <div className=''>
            <LoginLink className='text-900 text-white'>Login</LoginLink>
            <RegisterLink className='text-900 text-white'>Register</RegisterLink>
          </div>
        ) : (
          <>
            <p className='mb-8'>Well, well, well, it isn&apos;t...</p>
            <p className='text-lg font-medium'>
              {user.given_name} {user.family_name}
            </p>
            <pre className='mt-4 rounded-sm bg-slate-950 p-4 font-mono text-sm text-cyan-200'>
              {JSON.stringify(user, null, 2)}
            </pre>
            <LogoutLink className='mt-8 inline-block text-blue-500 underline'>
              Logout
            </LogoutLink>{' '}
          </>
        )}
      </div> */}
    </main>
  );
}
