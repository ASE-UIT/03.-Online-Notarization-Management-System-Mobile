import React, { useLayoutEffect, useState } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './Stack.typeDefs';
import { StyleSheet } from 'react-native';
import { DrawerProps } from '../drawer/Drawer.typeDefs';
import { StackHeaderLeft, StackHeaderTitle } from './components';
import { colors, fonts } from '@theme';

// views
import Home from '@views/Home';
import { SignIn, SignUp } from '@views/Auth';
import Search from '@views/Search';
import QRScan from '@views/QRScan';
import { Other, Policy, Profile, Wallet } from '@views/Other';
import { AddSession, Session } from '@views/Session';

import { ServiceAndField, ProvideInformation, ConfirmInformation } from '@views/Notarization';
import { useDocumentSlice } from '@modules/document';
import Button from '@components/Button';

const Stack = createNativeStackNavigator<StackParamList>();

const navigationProps = {
  headerTintColor: colors.white,
  headerStyle: { backgroundColor: '#fff', alignItems: 'center' },
  headerTitleStyle: { fontSize: 20, fontFamily: fonts.beVietnamPro.bold },
};

export function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={SignIn}
        name="SignInStack"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={SignUp}
        name="SignUpStack"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Home}
        name="HomeStack"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function HomeStackNavigator({ navigation, route }) {
  const { dispatch, resetDocumentState } = useDocumentSlice();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeStack';

    const hiddenScreens = ['CreateServiceAndField', 'ProvideInformation', 'ConfirmInformation'];
    if (hiddenScreens.includes(routeName)) {
      navigation.setOptions({
        tabBarStyle: { display: 'none' },
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: colors.white[50],
          borderTopColor: colors.gray[100],
          borderTopWidth: 1,
          height: 80,
        },
      });
    }
  }, [navigation, route]);

  const handleBack = () => {
    setIsModalVisible(true);
  };

  const handleConfirmBack = () => {
    dispatch(resetDocumentState());
    navigation.goBack();
  };

  const handleCancelBack = () => {
    setIsModalVisible(false); // Đóng modal nếu không xác nhận
  };

  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Home}
        name="HomeStack"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ServiceAndField}
        name="CreateServiceAndField"
        options={{
          headerStyle: styles.headerBackground,
          headerTitle: 'Tạo hồ sơ công chứng',
        }}
      />
      <Stack.Screen
        component={ProvideInformation}
        name="ProvideInformation"
        options={{
          headerStyle: styles.headerBackground,
          headerTitle: 'Tạo hồ sơ công chứng',
          animation: 'none',
          headerLeft: () => <Button onPress={handleBack} title="Back" />,
        }}
      />
      <Stack.Screen
        component={ConfirmInformation}
        name="ConfirmInformation"
        options={{
          headerStyle: styles.headerBackground,
          headerTitle: 'Tạo hồ sơ công chứng',
          animation: 'none',
          headerLeft: () => <Button onPress={handleBack} title="Back" />,
        }}
      />
    </Stack.Navigator>
  );
}

export function SearchStackNavigator() {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Search}
        name="SearchStack"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function SessionStackNavigator() {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Session}
        name="SessionStack"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddSession}
        name="AddSessionStack"
        options={{
          headerTitle: 'Tạo phiên công chứng',
          headerLeft: () => <StackHeaderLeft isCreateScreen={false} />,
        }}
      />
    </Stack.Navigator>
  );
}

export function OtherStackNavigator() {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Other}
        name="OtherStack"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Policy}
        name="PolicyStack"
        options={{
          headerTitle: 'Chính sách',
          headerLeft: () => <StackHeaderLeft isCreateScreen={false} />,
        }}
      />
      <Stack.Screen
        component={Profile}
        name="ProfileStack"
        options={{
          headerTitle: 'Tài khoản của tôi',
          headerLeft: () => <StackHeaderLeft isCreateScreen={false} />,
        }}
      />
      <Stack.Screen
        component={Wallet}
        name="WalletStack"
        options={{
          headerTitle: 'Ví của tôi',
          headerLeft: () => <StackHeaderLeft isCreateScreen={false} />,
        }}
      />
    </Stack.Navigator>
  );
}

export function QRScanStackNavigator() {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={QRScan}
        name="QRScanStack"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: colors.white[100],
  },
});
