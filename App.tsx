import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigator from '@navigator';
import store from '@utils/store';
import SignIn from '@views/Auth/SignIn';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SignIn />
      </Provider>
    </GestureHandlerRootView>
  );
}
