import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type Props = {};

const ThemeButton = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const isdarkTheme = theme === 'dark';

  // bg-[url('/img/hero-pattern.svg')]">

  return !mounted ? (
    <></>
  ) : (
    <button
      type='button'
      title='Toggle Theme'
      className={`aspect-square w-8 ${
        isdarkTheme
          ? 'bg-[url(/assets/svgs/icon-sun.svg)]'
          : 'bg-[url(/assets/svgs/icon-moon.svg)]'
      } bg-cover bg-no-repeat`}
      onClick={() => setTheme(isdarkTheme ? 'light' : 'dark')}
    >
      <span className='sr-only'>Toggle Theme</span>
    </button>
  );
};

export { ThemeButton };
