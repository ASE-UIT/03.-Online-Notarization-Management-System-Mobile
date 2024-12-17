import React, { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList, StackProps } from './Stack.typeDefs';
import { StyleSheet } from 'react-native';
import { StackHeaderLeft } from './components';
import { colors, fonts } from '@theme';

// views
import { Home, QRCodeScreen } from '@views/Home';
import { SignIn, SignUp } from '@views/Auth';
import { Search, DetailDocument } from '@views/Search';
import { QRScan, TransferNFT } from '@views/QRScan';
import { Other, Policy, Profile, Wallet } from '@views/Other';
import { AddSession, Session, SessionDetail } from '@views/Session';

import { ServiceAndField, ProvideInformation, ConfirmInformation } from '@views/Notarization';
import { useDocumentSlice } from '@modules/document';
import TabNavigator from '@navigator/tab/Tab';

const Stack = createNativeStackNavigator<StackParamList>();

const navigationProps = {
  headerTintColor: colors.white,
  headerStyle: { backgroundColor: '#fff', alignItems: 'center' },
  headerTitleStyle: { fontSize: 20, fontFamily: fonts.beVietnamPro.bold },
};

const qrNavigationProps = {
  headerStyle: { backgroundColor: 'transparent', alignItems: 'center' },
  headerTitleStyle: { fontSize: 20, fontFamily: fonts.beVietnamPro.bold },
};

const renderHeaderLeft = (isCreateScreen: boolean, onConfirm?: () => void) => {
  return <StackHeaderLeft isCreateScreen={isCreateScreen} onConfirm={onConfirm} />;
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
        component={TabNavigator}
        name="TabNavigator"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function HomeStackNavigator({ navigation, route }: any) {
  const { dispatch, resetDocumentState } = useDocumentSlice();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeStack';

    const hiddenScreens = [
      'CreateServiceAndField',
      'ProvideInformation',
      'ConfirmInformation',
      'QRCodeStack',
    ];
    if (hiddenScreens.includes(routeName)) {
      navigation.setOptions({
        tabBarStyle: { display: 'none' },
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          height: 85,
          backgroundColor: 'transparent',
          elevation: 0,
          position: 'absolute',
        },
      });
    }
  }, [navigation, route]);

  const handleConfirmBack = () => {
    dispatch(resetDocumentState());
    navigation.navigate('HomeStack');
  };

  return (
    <Stack.Navigator initialRouteName="HomeStack">
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
          headerTitleStyle: styles.headerTitle,
          headerTransparent: true,
          headerLeft: () => renderHeaderLeft(false),
        }}
      />
      <Stack.Screen
        component={ProvideInformation}
        name="ProvideInformation"
        options={{
          headerStyle: styles.headerBackground,
          headerTitle: 'Tạo hồ sơ công chứng',
          headerTitleStyle: styles.headerTitle,
          headerTransparent: true,
          animation: 'none',
          headerLeft: () => renderHeaderLeft(true, handleConfirmBack),
        }}
      />
      <Stack.Screen
        component={ConfirmInformation}
        name="ConfirmInformation"
        options={{
          headerStyle: styles.headerBackground,
          headerTitle: 'Tạo hồ sơ công chứng',
          headerTitleStyle: styles.headerTitle,
          headerTransparent: true,
          animation: 'none',
          headerLeft: () => renderHeaderLeft(true, handleConfirmBack),
        }}
      />
      <Stack.Screen
        component={QRCodeScreen}
        name="QRCodeStack"
        options={{
          headerTitle: 'QR Code',
          headerTitleStyle: { fontSize: 20, fontFamily: fonts.beVietnamPro.bold },
          headerTransparent: true,
          headerLeft: () => <StackHeaderLeft isCreateScreen={false} />,
        }}
      />
    </Stack.Navigator>
  );
}

export function SearchStackNavigator({ navigation, route }: any) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'SearchStack';

    const hiddenScreens = ['DetailDocument'];
    if (hiddenScreens.includes(routeName)) {
      navigation.setOptions({
        tabBarStyle: { display: 'none' },
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          height: 85,
          backgroundColor: 'transparent',
          elevation: 0,
          position: 'absolute',
        },
      });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Search}
        name="SearchStack"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailDocument}
        name="DetailDocument"
        options={{
          headerStyle: styles.headerBackground,
          headerTitle: 'Chi tiết hồ sơ công chứng',
          headerLeft: () => renderHeaderLeft(false),
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
      <Stack.Screen
        component={SessionDetail}
        name="SessionDetailStack"
        options={{
          headerTitle: 'Chi tiết phiên công chứng',
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

export function QRScanStackNavigator({ navigation, route }) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'QRScanStack';

    const hiddenScreens = ['QRScanStack', 'TransferNFTStack'];
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
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={QRScan}
        name="QRScanStack"
        options={{
          headerTitle: 'Ví của tôi',
          headerTitleStyle: { fontSize: 20, fontFamily: fonts.beVietnamPro.bold, color: '#fff' },
          headerTransparent: true,
          headerLeft: () => <StackHeaderLeft isCreateScreen={false} backColor="#fff" />,
        }}
      />
      <Stack.Screen
        component={TransferNFT}
        name="TransferNFTStack"
        options={{
          headerTitle: 'Chuyển tài liệus số',
          headerLeft: () => <StackHeaderLeft isCreateScreen={false} />,
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

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: colors.white[50],
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.beVietnamPro.bold,
  },
});
