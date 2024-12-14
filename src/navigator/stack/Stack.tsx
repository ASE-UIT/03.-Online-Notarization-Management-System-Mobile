import React, { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './Stack.typeDefs';
import { StyleSheet } from 'react-native';
import { DrawerProps } from '../drawer/Drawer.typeDefs';
import { StackHeaderLeft, StackHeaderTitle } from './components';
import { colors } from '@theme';

// views
import Home from '@views/Home';
import { SignIn, SignUp } from '@views/Auth';
import Search from '@views/Search';
import Session from '@views/Session';
import QRScan from '@views/QRScan';
import { Other, Policy, Profile } from '@views/Other';

import { ServiceAndField, ProvideInformation, ConfirmInformation } from '@views/Notarization';

const Stack = createNativeStackNavigator<StackParamList>();

const navigationProps = {
  headerTintColor: colors.white,
  headerStyle: { backgroundColor: colors.darkPurple },
  headerTitleStyle: { fontSize: 18 },
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
        }}
      />
      <Stack.Screen
        component={ConfirmInformation}
        name="ConfirmInformation"
        options={{
          headerStyle: styles.headerBackground,
          headerTitle: 'Tạo hồ sơ công chứng',
          animation: 'none',
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Profile}
        name="ProfileStack"
        options={{
          headerShown: false,
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
