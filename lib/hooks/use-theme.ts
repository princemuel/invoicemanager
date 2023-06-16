'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

export const useThemeMode = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const isDarkMode = resolvedTheme === 'dark';

  const updateTheme = useCallback(() => {
    setTheme(isDarkMode ? 'light' : 'dark');
  }, [isDarkMode, setTheme]);

  return { isMounted, isDarkMode, updateTheme };
};
