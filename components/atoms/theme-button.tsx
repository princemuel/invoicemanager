'use client';

import { icons } from '@/common';
import { cn } from '@/helpers';
import { useTheme } from 'next-themes';
import React from 'react';
import { ClientOnly } from './client-only';

const ThemeToggle = () => {
  const { setTheme, resolvedTheme: theme } = useTheme();
  const [isPending, startTransition] = React.useTransition();

  const isDarkMode = theme === 'dark';
  const Icon = isDarkMode ? icons.app.sun : icons.app.moon;

  const updateTheme = React.useCallback(() => {
    startTransition(() => {
      setTheme(isDarkMode ? 'light' : 'dark');
    });
  }, [isDarkMode, setTheme]);

  return (
    <ClientOnly>
      <button
        type='button'
        title='Toggle Theme'
        className={cn(
          'flex aspect-square w-5 items-center justify-center',
          isPending && 'opacity-80'
        )}
        onClick={updateTheme}
      >
        <Icon className='transition-all' />
        <span className='sr-only'>Toggle theme</span>
      </button>
    </ClientOnly>
  );
};

export { ThemeToggle };
