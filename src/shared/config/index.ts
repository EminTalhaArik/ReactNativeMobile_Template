import Config from 'react-native-config';

export const appConfig = {
  clerkPublishableKey: Config.CLERK_PUBLISHABLE_KEY,
  apiBaseUrl: Config.API_BASE_URL,
  apiKey: Config.API_KEY,
  env: Config.APP_ENV ?? 'development',
};

export const requiredEnvVars = ['CLERK_PUBLISHABLE_KEY', 'API_BASE_URL', 'API_KEY'] as const;
