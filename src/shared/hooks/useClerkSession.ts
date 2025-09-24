import {useAuth, useUser} from '@clerk/clerk-react-native';
import {useCallback} from 'react';

export const useClerkSession = () => {
  const {isLoaded, sessionId, getToken, signOut} = useAuth();
  const {user} = useUser();

  const fetchToken = useCallback(async () => getToken({template: 'mobile'}), [getToken]);

  return {
    isLoaded,
    sessionId,
    user,
    fetchToken,
    signOut,
  };
};
