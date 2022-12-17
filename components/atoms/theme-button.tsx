import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type Props = {};

const ThemeButton = (props: Props) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  let src: string;

  switch (resolvedTheme) {
    case 'light':
      src = 'bg-[url(/assets/svgs/icon-moon.svg)]';
      break;
    case 'dark':
      src = 'bg-[url(/assets/svgs/icon-sun.svg)]';
      break;
    default:
      src = 'bg-[url(/assets/svgs/icon-sun.svg)]';
      break;
  }

  const isdarkTheme = theme === 'dark';

  // bg-[url('/img/hero-pattern.svg')]">

  return !mounted ? (
    <></>
  ) : (
    <button
      type='button'
      title='Toggle Theme'
      className={`aspect-square w-8 ${src} bg-cover bg-no-repeat`}
      onClick={() => setTheme(isdarkTheme ? 'light' : 'dark')}
    >
      <span className='sr-only'>Toggle Theme</span>
    </button>
  );
};

export { ThemeButton };
