import * as React from 'react';
import { off, on } from '../helpers';

type ThemeMode = 'dark' | 'light';
type ThemeState = ReturnType<typeof useThemeMode>[0] | null;
type SetThemeState = ReturnType<typeof useThemeMode>[1] | null;

const ThemeContext = React.createContext<ThemeState>(null);
const SetThemeContext = React.createContext<SetThemeState>(null);

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = useThemeMode();

  const modeValue = React.useMemo(() => mode, [mode]);
  const setModeValue = React.useMemo(() => setMode, [setMode]);

  return (
    <ThemeContext.Provider value={modeValue}>
      <SetThemeContext.Provider value={setModeValue}>
        {children}
      </SetThemeContext.Provider>
    </ThemeContext.Provider>
  );
};

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new ReferenceError(`useTheme must be used in a ThemeProvider`);
  }
  return context;
}

function useSetTheme() {
  const context = React.useContext(SetThemeContext);
  if (!context) {
    throw new ReferenceError(`useSetTheme must be used in a ThemeProvider`);
  }
  return context;
}

// only these 3 exported functions below are for app usage
export { useTheme, useSetTheme, ThemeProvider };

////////////////////////////////////////
////                              /////
//////////////////////////////////////
const preferDarkQuery = '(prefers-color-scheme: dark)';
/**
 * This hook is not for the user.
 * It exists only for the theme provider
 *
 * @returns readonly [ThemeMode, React.Dispatch<React.SetStateAction<ThemeMode>>]
 */
function useThemeMode() {
  const [mode, setMode] = React.useState<ThemeMode>(() => {
    const value = window.localStorage.getItem('mode');
    if (value) {
      return value === 'dark' ? 'dark' : 'light';
    }

    return window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light';
  });

  React.useEffect(() => {
    let isMounted = true;

    const handler = () => {
      if (!isMounted) return;
      setMode(window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light');
    };

    on(window, 'change', handler);

    return () => {
      isMounted = false;
      off(window, 'change', handler);
    };
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('mode', mode);
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  // we're doing it this way instead of as an effect so we only
  // set the localStorage value if they explicitly change the default
  return [mode, setMode] as const;
}
