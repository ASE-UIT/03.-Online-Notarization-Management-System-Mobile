import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@theme';
import { TabParamList, TabBarStatus } from './Tab.typeDefs';
import {
  HomeStackNavigator,
  OtherStackNavigator,
  QRScanStackNavigator,
  SearchStackNavigator,
  SessionStackNavigator,
} from '../stack/Stack';
import { Image, ImageBackground, TouchableOpacity, View, Text } from 'react-native';

const Tab = createBottomTabNavigator<TabParamList>();

const CustomTabBarButton = ({
  children,
  onPress,
  name,
}: {
  children: React.ReactNode;
  onPress: () => void;
  name: any;
}) => {
  return (
    <TouchableOpacity
      style={{
        top: -40,
        right: 7,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: colors.primary[500],
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AntDesign name={name} size={40} color={colors.white[50]} />
      </View>
    </TouchableOpacity>
  );
};

const TabBarIconWithLabel = ({
  name,
  label,
  focused,
}: {
  name: any;
  label: string;
  focused: boolean;
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: focused ? 3 : 0,
        height: '100%',
        width: '60%',
        borderTopColor: colors.primary[500],
      }}>
      <AntDesign name={name} size={24} color={focused ? colors.primary[500] : colors.black[700]} />
      <Text style={{ color: focused ? colors.primary[500] : colors.black[700] }}>{label}</Text>
    </View>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Hide the tab name
        tabBarBackground: () => (
          <ImageBackground
            source={require('@assets/images/navbar_background.png')}
            style={{ width: '100%', height: '100%' }}
          />
        ),
        tabBarStyle: {
          height: 70,
          backgroundColor: 'transparent',
          shadowOpacity: 0, // Removes shadow
          borderBottomWidth: 0, // Removes bottom border
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconWithLabel name="home" label="Home" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconWithLabel name="search1" label="Search" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="QRScanTab"
        component={QRScanStackNavigator}
        options={{ tabBarButton: props => <CustomTabBarButton {...props} name="qrcode" /> }}
      />
      <Tab.Screen
        name="SessionTab"
        component={SessionStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconWithLabel name="calendar" label="Session" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="OtherTab"
        component={OtherStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconWithLabel name="bars" label="Session" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
