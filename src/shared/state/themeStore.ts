import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeState {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      preference: 'system',
      setPreference: preference => set({preference}),
    }),
    {
      name: 'theme-preference',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
