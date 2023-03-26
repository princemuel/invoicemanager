import { MainContent } from './content';
import { Sidebar } from './sidebar';

type Props = {};

const Layout = (props: Props) => {
  return (
    <div className='relative flex min-h-screen flex-col md:flex-row'>
      <Sidebar />
      <MainContent />
    </div>
  );
};

export { Layout };
