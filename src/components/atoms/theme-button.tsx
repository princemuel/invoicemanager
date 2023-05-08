import { useSetTheme, useTheme } from '@src/lib';
import { clsx } from 'clsx';

const ThemeButton = () => {
  const theme = useTheme();
  const setTheme = useSetTheme();
  const isdarkTheme = theme === 'dark';

  return (
    <button
      type='button'
      title='Toggle Theme'
      className={clsx(
        'aspect-square w-8 bg-cover bg-no-repeat',
        theme === 'light'
          ? 'bg-[url(/assets/svgs/icon-moon.svg)]'
          : 'bg-[url(/assets/svgs/icon-sun.svg)]'
      )}
      onClick={() => void setTheme(isdarkTheme ? 'light' : 'dark')}
    >
      <span className='sr-only'>Toggle Theme</span>
    </button>
  );
};

export { ThemeButton };
