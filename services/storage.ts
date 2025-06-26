import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // handle error as needed
      console.error('AsyncStorage setItem error:', e);
    }
  },

  async getItem<T = any>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // handle error as needed
      console.error('AsyncStorage getItem error:', e);
      return null;
    }
  },
};

const storageKeys = {
  userType: 'userType',
  userOboardingStep: 'userOboardingStep',
  guardianData: 'guardianData',
  familyData: 'familyData',
}

export { storage, storageKeys };
