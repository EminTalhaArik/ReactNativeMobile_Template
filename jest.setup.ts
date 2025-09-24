import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-config', () => ({
  CLERK_PUBLISHABLE_KEY: 'pk_test',
  API_BASE_URL: 'https://api.example.com',
  API_KEY: 'test-key'
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
