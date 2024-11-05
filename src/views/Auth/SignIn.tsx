// src/views/Login/Login.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useAppSlice } from '@modules/app';
import { colors } from '@theme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const SignIn = ({ navigation }: StackProps) => {
  const { dispatch, setLoggedIn, setUser } = useAppSlice();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    const user = { name: 'Test User', email };
    dispatch(setUser(user));
    dispatch(setLoggedIn(true));
    navigation.navigate('HomeStack');
  };

  return (
    <SafeAreaView>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
