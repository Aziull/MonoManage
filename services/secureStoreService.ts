import * as SecureStore from 'expo-secure-store';

const KEY_AUTH_TOKEN = 'authToken';

interface SecureStoreService {
  saveAuthToken: (token: string) => Promise<void>;
  getAuthToken: () => Promise<string | null>;
}

const secureStoreService: SecureStoreService = {
  saveAuthToken: async (token: string | null): Promise<void> => {
    try {      
      await SecureStore.setItemAsync(KEY_AUTH_TOKEN, JSON.stringify(token));
    } catch (error) {
      console.error('Помилка при збереженні токену', error);
      throw error;
    }
  },

  getAuthToken: async (): Promise<string | null> => {
    try {
      const json = await SecureStore.getItemAsync(KEY_AUTH_TOKEN);
      
      return JSON.parse(json);
    } catch (error) {
      console.error('Помилка при отриманні токену', error);
      throw error;
    }
  },
};

export default secureStoreService;
