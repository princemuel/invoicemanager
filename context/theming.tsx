import type { DarkModeState } from 'hooks';
import { SetDarkModeState, useMode } from 'hooks';
import * as React from 'react';

type IThemeStore = DarkModeState | undefined;
type ISetThemeStore = SetDarkModeState | undefined;

const ThemeStore = React.createContext<IThemeStore>(undefined);
const SetThemeStore = React.createContext<ISetThemeStore>(undefined);

type Props = {
  children: React.ReactNode;
};

export const ThemeStoreProvider = ({ children }: Props) => {
  const [mode, setMode] = useMode();

  const modeValue = React.useMemo(() => mode, [mode]);
  const setModeValue = React.useMemo(() => setMode, [setMode]);

  return (
    <ThemeStore.Provider value={modeValue}>
      <SetThemeStore.Provider value={setModeValue}>
        {children}
      </SetThemeStore.Provider>
    </ThemeStore.Provider>
  );
};

export const useThemeStore = () => {
  const mode = React.useContext(ThemeStore);
  const setMode = React.useContext(SetThemeStore);
  if (mode == undefined || setMode == undefined) {
    throw new Error('useThemeStore must be used in a ThemeStoreProvider');
  }

  return { mode, setMode };
};
