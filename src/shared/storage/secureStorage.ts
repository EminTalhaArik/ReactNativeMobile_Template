import EncryptedStorage from 'react-native-encrypted-storage';

export const secureStorage = {
  async get(key: string) {
    return EncryptedStorage.getItem(key);
  },
  async set(key: string, value: string) {
    await EncryptedStorage.setItem(key, value);
  },
  async delete(key: string) {
    await EncryptedStorage.removeItem(key);
  },
  async clear() {
    await EncryptedStorage.clear();
  },
};
