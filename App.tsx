import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigator from '@navigator';
import store from '@utils/store';
import { useEffect, useState } from 'react';
import { loadFonts } from '@theme';
import * as SplashScreen from 'expo-splash-screen';
import { SignUp } from '@views/Auth';
import { useUserSlice } from '@modules/user';
import { useAppSlice, useAppService, IUser } from '@modules/app';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadResources() {
      await loadFonts();
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    }
    loadResources();
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Navigator />
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
}
