import { IUser } from '@modules/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAppService() {
  /**
   * fake promise function to simulate async function
   */
  async function getUser(): Promise<IUser> {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        return JSON.parse(user) as IUser;
      } else {
        return Promise.reject('User not found');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return { getUser };
}
