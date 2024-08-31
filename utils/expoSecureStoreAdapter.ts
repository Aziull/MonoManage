import * as SecureStore from 'expo-secure-store';
import { Storage } from 'redux-persist';

// Функція для санітізації ключів, замінює всі символи, крім алфавітно-цифрових, ".", "-", та "_" на "_"
const sanitizeKey = (key: string) => key.replace(/[^a-zA-Z0-9\.\-\_]/g, '_');

export const expoSecureStoreAdapter: Storage = {
  async getItem(key: string): Promise<string | null> {
    const sanitizedKey = sanitizeKey(key);
    return SecureStore.getItemAsync(sanitizedKey);
  },
  async setItem(key: string, value: string): Promise<void> {
    const sanitizedKey = sanitizeKey(key);
    await SecureStore.setItemAsync(sanitizedKey, value);
  },
  async removeItem(key: string): Promise<void> {
    const sanitizedKey = sanitizeKey(key);
    await SecureStore.deleteItemAsync(sanitizedKey);
  },
};
