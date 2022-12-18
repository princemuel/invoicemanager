import { ReactNode } from 'react';
import { Sidebar } from './sidebar';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='relative flex min-h-screen flex-col md:flex-row'>
      <Sidebar />
      <main className='relative min-h-screen flex-1'>{children}</main>
    </div>
  );
};

export { Layout };
