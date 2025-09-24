import React from 'react';
import {useAuth} from '@clerk/clerk-react-native';
import {AuthNavigator} from './AuthNavigator';
import {MainNavigator} from './MainNavigator';

export const AppNavigator = () => {
  const {isSignedIn, isLoaded} = useAuth();

  if (!isLoaded) {
    return null;
  }

  return isSignedIn ? <MainNavigator /> : <AuthNavigator />;
};
