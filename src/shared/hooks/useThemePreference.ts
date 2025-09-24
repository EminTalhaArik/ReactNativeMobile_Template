import {useCallback} from 'react';
import {useThemeStore, ThemePreference} from '@shared/state/themeStore';

export const useThemePreference = () => {
  const preference = useThemeStore(state => state.preference);
  const setPreference = useThemeStore(state => state.setPreference);

  const toggle = useCallback(() => {
    if (preference === 'light') {
      setPreference('dark');
    } else if (preference === 'dark') {
      setPreference('system');
    } else {
      setPreference('light');
    }
  }, [preference, setPreference]);

  return {preference, setPreference, toggle};
};
