import * as React from 'react';

export type DarkModeState = 'dark' | 'light';
export type SetDarkModeState = React.Dispatch<
  React.SetStateAction<DarkModeState>
>;

export function useMode() {
  const preferDarkQuery = '(prefers-color-scheme: dark)';
  const [mounted, setMounted] = React.useState(false);

  const [mode, setMode] = React.useState<DarkModeState>(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const lsVal = window?.localStorage?.getItem('colorMode') as DarkModeState;
      if (lsVal) {
        return lsVal === 'dark' ? 'dark' : 'light';
      } else {
        return window?.matchMedia(preferDarkQuery).matches ? 'dark' : 'light';
      }
    }
    return 'dark' ? 'dark' : 'light';
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const mediaQuery = window?.matchMedia(preferDarkQuery);
    const handleChange = () => {
      setMode(mediaQuery?.matches ? 'dark' : 'light');
    };
    mediaQuery?.addEventListener('change', handleChange);
    return () => mediaQuery?.removeEventListener('change', handleChange);
  }, [mounted]);

  React.useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  // doing it this way instead of as an effect so as to only
  // set the localStorage value if the default theme is explicitly changed
  return [mode, setMode] as const;
}

// usage
// const [mode, setMode] = useDarkMode()
// <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
//   {mode === 'light' ? <RiMoonClearLine /> : <RiSunLine />}
// </button>;
