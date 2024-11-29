import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useAppSlice } from '@modules/app';
import { colors, fonts, images } from '@theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';
import { StackProps } from '@navigator';
import { InputFieldProps } from 'src/types';

const SignIn = ({ navigation }: StackProps) => {
  const { dispatch, setLoggedIn, setUser } = useAppSlice();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const handleLogin = () => {
    const user = { name: 'random', email };
    dispatch(setUser(user));
    dispatch(setLoggedIn(true));
    navigation.navigate('HomeStack');
  };

  const moveToSignUp = () => {
    navigation.navigate('SignUpStack');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={images.logo_lg} style={styles.logo} />
        <Text style={styles.title}>Đăng nhập</Text>

        <InputField
          label="Email"
          icon="mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <InputField
          label="Mật khẩu"
          icon="lock"
          value={password}
          onChangeText={setPassword}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          toggleSecureTextEntry={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
        />

        <View style={styles.rememberContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox value={isRemember} onValueChange={setIsRemember} />
            <Text style={styles.rememberText}>Ghi nhớ đăng nhập</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={moveToSignUp}>
            <Text style={styles.signupLink}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
        <Divider text="hoặc" />
        <SocialLoginButton iconSource={images.google} text="Đăng nhập bằng Google" />
      </ScrollView>
    </SafeAreaView>
  );
};

const InputField = ({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  toggleSecureTextEntry,
  showPassword,
}: InputFieldProps) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <AntDesign name={icon} size={24} color={colors.gray[300]} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {toggleSecureTextEntry && (
        <TouchableOpacity onPress={toggleSecureTextEntry}>
          <AntDesign name={showPassword ? 'eye' : 'eyeo'} size={24} color={colors.gray[300]} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const Divider = ({ text }: { text: string }) => (
  <View style={styles.dividerContainer}>
    <View style={styles.line} />
    <Text style={styles.dividerText}>{text}</Text>
    <View style={styles.line} />
  </View>
);

const SocialLoginButton = ({ iconSource, text }: { iconSource: any; text: string }) => (
  <TouchableOpacity style={styles.socialButton}>
    <Image source={iconSource} style={styles.socialIcon} />
    <Text style={styles.socialButtonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingHorizontal: 20, justifyContent: 'center' },
  logo: { width: 100, height: 100, alignSelf: 'center', marginVertical: 24 },
  title: {
    fontSize: 40,
    color: colors.gray[900],
    alignSelf: 'center',
    marginBottom: 24,
    fontFamily: fonts.beVietnamPro.bold,
  },
  inputContainer: { marginBottom: 20 },
  label: {
    color: colors.gray[800],
    marginBottom: 8,
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.regular,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.gray[300],
    borderRadius: 8,
    padding: 12,
  },
  input: { flex: 1, marginLeft: 8 },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 8,
    color: colors.gray[800],
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.regular,
  },
  forgotText: {
    color: colors.blue[500],
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: fonts.beVietnamPro.bold,
  },
  loginButton: {
    backgroundColor: colors.primary[500],
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: colors.white[50],
    fontSize: 20,
    fontFamily: fonts.beVietnamPro.bold,
  },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 40 },
  signupText: { fontSize: 18, fontFamily: fonts.beVietnamPro.regular },
  signupLink: {
    fontSize: 18,
    color: colors.blue[500],
    textDecorationLine: 'underline',
    fontFamily: fonts.beVietnamPro.bold,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 48,
    justifyContent: 'center',
  },
  line: { backgroundColor: colors.gray[100], height: 1, flex: 1, marginHorizontal: 16 },
  dividerText: { fontSize: 20, fontFamily: fonts.beVietnamPro.regular },
  socialButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.gray[300],
    padding: 12,
    borderRadius: 10,
  },
  socialIcon: { width: 32, height: 32 },
  socialButtonText: {
    color: colors.gray[700],
    marginLeft: 12,
    fontSize: 18,
    fontFamily: fonts.beVietnamPro.regular,
  },
});

export default SignIn;
