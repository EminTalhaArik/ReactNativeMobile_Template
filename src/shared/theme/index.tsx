import React, {PropsWithChildren, useEffect, useMemo, useState} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';
import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';
import {useThemeStore} from '@shared/state/themeStore';
import {darkTheme} from './modes/dark';
import {lightTheme} from './modes/light';

const getThemeByScheme = (scheme: ColorSchemeName) => {
  if (scheme === 'dark') {
    return darkTheme;
  }
  return lightTheme;
};

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const preference = useThemeStore(state => state.preference);
  const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => setSystemScheme(colorScheme));
    return () => subscription.remove();
  }, []);

  const activeScheme = preference === 'system' ? systemScheme : preference;

  const theme = useMemo(() => getThemeByScheme(activeScheme), [activeScheme]);

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
