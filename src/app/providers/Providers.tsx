import React, {PropsWithChildren, useEffect} from 'react';
import {ClerkProvider, ClerkLoaded, useAuth} from '@clerk/clerk-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from '@shared/theme';
import {appConfig} from '@shared/config';
import {setSessionTokenProvider} from '@shared/api/client';
import {secureStorage} from '@shared/storage/secureStorage';
import {navigationRef} from '@app/navigation/navigationRef';

type TokenCache = {
  getToken: (key: string) => Promise<string | null | undefined>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken: (key: string) => Promise<void>;
};

const tokenCache: TokenCache = {
  async getToken(key) {
    return secureStorage.get(key);
  },
  async saveToken(key, token) {
    await secureStorage.set(key, token);
  },
  async clearToken(key) {
    await secureStorage.delete(key);
  },
};

const SessionTokenBridge = () => {
  const {getToken} = useAuth();

  useEffect(() => {
    setSessionTokenProvider(() => getToken({template: 'mobile'}));
  }, [getToken]);

  return null;
};

export const Providers = ({children}: PropsWithChildren) => {
  if (__DEV__ && !appConfig.clerkPublishableKey) {
    console.warn('CLERK_PUBLISHABLE_KEY bulunamadı. Lütfen .env dosyasını kontrol edin.');
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ClerkProvider publishableKey={appConfig.clerkPublishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
          <SafeAreaProvider>
            <ThemeProvider>
              <NavigationContainer ref={navigationRef}>
                <SessionTokenBridge />
                {children}
              </NavigationContainer>
            </ThemeProvider>
          </SafeAreaProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
};
