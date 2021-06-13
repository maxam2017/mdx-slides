import { useContext } from 'react';
import { ThemeContext, SetThemeContext, Theme } from '~/context/ThemeProvider';

export default function useTheme(): [Theme, (theme: Theme) => void] {
  const theme = useContext(ThemeContext);
  const setTheme = useContext(SetThemeContext);

  return [theme, setTheme];
}

export function useStaticTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}
