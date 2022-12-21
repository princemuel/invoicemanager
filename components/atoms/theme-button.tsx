import { clsx } from 'helpers';
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

  const isdarkTheme = resolvedTheme === 'dark';

  const classes = clsx(
    'aspect-square w-8 bg-cover bg-no-repeat',
    resolvedTheme === 'light'
      ? 'bg-[url(/assets/svgs/icon-moon.svg)]'
      : 'bg-[url(/assets/svgs/icon-sun.svg)]'
  );

  return isMounted ? (
    <button
      type='button'
      title='Toggle Theme'
      className={classes}
      onClick={() => setTheme(isdarkTheme ? 'light' : 'dark')}
    >
      <span className='sr-only'>Toggle Theme</span>
    </button>
  ) : (
    <></>
  );
};

export { ThemeButton };
