import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useAppSlice, useAppService, IUser } from '@modules/app';
import { loadImages, loadFonts } from '@theme';
import { useDataPersist, DataPersistKeys } from '@hooks';
import { AuthStackNavigator } from './stack';
import TabNavigator from './tab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserSlice } from '@modules/user';
import UserService from '@modules/user/user.service';

// keep the splash screen visible while complete fetching resources
SplashScreen.preventAutoHideAsync();

function Navigator() {
  const { getUser } = useAppService();
  const { dispatch, setUser } = useUserSlice();
  const [remember, setRemember] = useState(false);
  const preload = async () => {
    try {
      await Promise.all([loadImages(), loadFonts()]);
      const accessTokenString = await AsyncStorage.getItem('accessToken');
      const refreshTokenString = await AsyncStorage.getItem('refreshToken');
      const accessToken = accessTokenString ? JSON.parse(accessTokenString) : null;
      const refreshToken = refreshTokenString ? JSON.parse(refreshTokenString) : null;
      const rememberFromStorage = await AsyncStorage.getItem('remember');
      if (rememberFromStorage === 'false') {
        setRemember(false);
        AsyncStorage.clear();
      } else {
        if (
          accessToken &&
          refreshToken &&
          new Date(accessToken.expires).getTime() < Date.now() &&
          new Date(refreshToken.expires).getTime() > Date.now()
        ) {
          const response = await UserService.refreshAccessToken(refreshToken.token);
          await AsyncStorage.setItem('accessToken', JSON.stringify(response.access));
          await AsyncStorage.setItem('refreshToken', JSON.stringify(response.refresh));
          setRemember(true);
          const user = await getUser();
          dispatch(setUser(user));
        } else if (new Date(accessToken.expires).getTime() > Date.now()) {
          setRemember(true);
          const user = await getUser();
          dispatch(setUser(user));
        } else {
          AsyncStorage.clear();
          console.log('[##] clear storage');
        }
      }
      SplashScreen.hideAsync();
    } catch (err) {
      console.log('[##] preload error:', err);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <NavigationContainer>
      {remember ? <TabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default Navigator;
