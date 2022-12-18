import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  let themeIcon: string;
  const isdarkTheme = resolvedTheme === 'dark';

  switch (resolvedTheme) {
    case 'light':
      themeIcon = 'bg-[url(/assets/svgs/icon-moon.svg)]';
      break;
    case 'dark':
      themeIcon = 'bg-[url(/assets/svgs/icon-sun.svg)]';
      break;
    default:
      themeIcon = 'bg-[url(/assets/svgs/icon-sun.svg)]';
      break;
  }

  return isMounted ? (
    <button
      type='button'
      title='Toggle Theme'
      className={`aspect-square w-8 ${themeIcon} bg-cover bg-no-repeat`}
      onClick={() => setTheme(isdarkTheme ? 'light' : 'dark')}
    >
      <span className='sr-only'>Toggle Theme</span>
    </button>
  ) : (
    <></>
  );
};

export { ThemeButton };
