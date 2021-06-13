import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export const ThemeContext = createContext<Theme>('light');
export const SetThemeContext = createContext<(theme: Theme) => void>(() => {});

export default function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  useEffect(() => {
    const theme = localStorage.getItem('theme') as 'dark' | 'light';
    setTheme(theme);
  }, []);

  return (
    <SetThemeContext.Provider value={setTheme}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </SetThemeContext.Provider>
  );
}
