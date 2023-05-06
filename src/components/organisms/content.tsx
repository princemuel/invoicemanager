import { Outlet } from 'react-router-dom';

type Props = {};

const MainContent = (props: Props) => {
  return (
    <main className='relative min-h-screen flex-1'>
      <Outlet />
    </main>
  );
};

export { MainContent };
