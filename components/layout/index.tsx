import { useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className='grid min-h-screen overflow-hidden'>
      {/* SIDEBAR */}
      The current theme is: {theme}
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value='system'>System</option>
        <option value='dark'>Dark</option>
        <option value='light'>Light</option>
      </select>
      {children}
    </div>
  );
};

export { Layout };
