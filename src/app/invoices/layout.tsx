import { InvoicesRouteLayout } from '@/components';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex min-h-full flex-col bg-white text-brand-900 dark:bg-brand-800 dark:text-white md:flex-row'>
      <InvoicesRouteLayout>{children}</InvoicesRouteLayout>
    </div>
  );
}

export default Layout;
