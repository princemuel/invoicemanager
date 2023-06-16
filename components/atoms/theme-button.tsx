'use client';

import { useThemeMode } from '@/lib';
import { cx } from 'cva';

const ThemeButton = () => {
  const { isMounted, isDarkMode, updateTheme } = useThemeMode();
  if (!isMounted) return null;

  return (
    <button
      type='button'
      title='Toggle Theme'
      className={cx(
        'aspect-square w-8 bg-cover bg-no-repeat',
        !isDarkMode
          ? 'bg-[url(/assets/svgs/icon-moon.svg)]'
          : 'bg-[url(/assets/svgs/icon-sun.svg)]'
      )}
      onClick={updateTheme}
    >
      <span className='sr-only'>Toggle Theme</span>
    </button>
  );
};

export { ThemeButton };
