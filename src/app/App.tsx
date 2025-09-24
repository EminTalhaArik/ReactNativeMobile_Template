import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Providers} from './providers/Providers';
import {AppNavigator} from './navigation/AppNavigator';
import {useThemeStore} from '@shared/state/themeStore';

const StatusBarSync = () => {
  const theme = useTheme();
  const preference = useThemeStore(state => state.preference);
  const systemScheme = useColorScheme();
  const scheme = preference === 'system' ? systemScheme : preference;
  const isDark = scheme === 'dark';

  return <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />;
};

const App = () => {
  return (
    <Providers>
      <StatusBarSync />
      <AppNavigator />
    </Providers>
  );
};

export default App;
