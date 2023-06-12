import { MainContent, Sidebar } from '../organisms';

interface Props {}

function RootLayout(props: Props) {
  return (
    <div className='relative flex min-h-screen flex-col md:flex-row'>
      <Sidebar />
      <MainContent />
    </div>
  );
}

export { RootLayout };
