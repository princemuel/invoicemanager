import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='grid min-h-screen overflow-hidden'>
      {/* SIDEBAR */}

      {/* MAINCONTENT */}
      {children}
    </div>
  );
};

export { Layout };
