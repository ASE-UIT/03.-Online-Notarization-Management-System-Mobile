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
  TouchableOpacity,
} from 'react-native';
import { useAppSlice } from '@modules/app';
import { colors, images } from '@theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Feather from '@expo/vector-icons/Feather';
import Checkbox from 'expo-checkbox';

const SignIn = ({ navigation }: StackProps) => {
  const { dispatch, setLoggedIn, setUser } = useAppSlice();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const handleLogin = () => {
    const user = { name: 'Test User', email };
    dispatch(setUser(user));
    dispatch(setLoggedIn(true));
    navigation.navigate('HomeStack');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require('@assets/images/background.png')} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.title}>Congchungonline</Text>
            <Text style={styles.subtitle}>Sign in to your Account</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.input,
                  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
                ]}>
                <TextInput
                  style={{ flex: 1 }}
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry={!showPassword}
                  placeholder="Password"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={24}
                    color={colors.gray[400]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rememberWrapper}>
              <View style={styles.checkBoxWrapper}>
                <Checkbox value={isRemember} onValueChange={setIsRemember} />
                <Text style={styles.rememberText}>Remember Me</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.separator}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>Or login with</Text>
              <View style={styles.line} />
            </View>
            <TouchableOpacity style={styles.googleButton}>
              <Image source={images.google} style={styles.googleIcon} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            <View style={styles.signupWrapper}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white[50],
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white[50],
    textAlign: 'center',
  },
  body: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    backgroundColor: colors.white[50],
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: colors.gray[400],
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray[200],
    padding: 10,
  },
  rememberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberText: {
    marginLeft: 8,
  },
  forgotPasswordText: {
    color: colors.blue[500],
    textAlign: 'right',
  },
  signInButton: {
    backgroundColor: colors.primary[400],
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  signInButtonText: {
    color: colors.white[50],
    fontSize: 20,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    backgroundColor: colors.gray[100],
    height: 1,
    flex: 1,
  },
  separatorText: {
    color: colors.gray[100],
    marginHorizontal: 8,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: colors.white[50],
    borderWidth: 0.5,
    borderColor: colors.gray[200],
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  googleButtonText: {
    color: colors.gray[400],
    fontSize: 16,
    marginLeft: 16,
  },
  signupWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
  },
  signupLink: {
    color: colors.blue[500],
    fontSize: 16,
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SignIn;
