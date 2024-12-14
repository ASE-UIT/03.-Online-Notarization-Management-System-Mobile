import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useAppSlice, useAppService, IUser } from '@modules/app';
import BottomSheet from '@components/BottomSheet';
import { WelcomeBottomSheetContents } from '@layouts/BottomSheetContents';
import DrawerNavigator from './drawer';
import { loadImages, loadFonts } from '@theme';
import { useDataPersist, DataPersistKeys } from '@hooks';
import { isWeb } from '@utils/deviceInfo';
import { AuthStackNavigator } from './stack';
import TabNavigator from './tab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserSlice } from '@modules/user';

// keep the splash screen visible while complete fetching resources
SplashScreen.preventAutoHideAsync();

function Navigator() {
  const { getUser } = useAppService();
  const { dispatch, loggedIn, setUser, setLoggedIn } = useUserSlice();
  const { setPersistData, getPersistData } = useDataPersist();
  // TODO: switch router by loggedIn status
  const preload = async () => {
    try {
      // preload assets
      await Promise.all([loadImages(), loadFonts()]);

      // fetch user data (fake promise function to simulate async function)
      const user = await getUser();

      // store user data to redux
      dispatch(setUser(user));
      dispatch(setLoggedIn(user ? true : false));

      // store user data to persistent storage (async storage)
      if (user) setPersistData<IUser>(DataPersistKeys.USER, user);

      // hide splash screen
      SplashScreen.hideAsync();
    } catch (err) {
      console.log('[##] preload error:', err);

      // if preload failed, try to get user data from persistent storage
      // getPersistData<IUser>(DataPersistKeys.USER)
      //   .then(user => {
      //     if (user) {
      //       dispatch(setUser(user));
      //       dispatch(setLoggedIn(!!user));
      //     }
      //   })
      //   .finally(() => {
      //     // hide splash screen
      //     SplashScreen.hideAsync();
      //   });
    }
  };

  useEffect(() => {
    preload();
  }, []);
  console.log('[##] loggedIn', loggedIn);

  return (
    <NavigationContainer>
      {loggedIn ? <TabNavigator/> : <AuthStackNavigator/>}
    </NavigationContainer>
  )
}

export default Navigator;
