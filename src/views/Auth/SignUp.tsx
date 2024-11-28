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

const SignUp = ({ navigation }: StackProps) => {
  const { dispatch, setLoggedIn, setUser } = useAppSlice();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const handleSignUp = () => {};
  const moveToSignIn = () => {
    navigation.navigate('SignInStack');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={images.logo_lg} style={styles.logo} />
        <Text style={styles.title}>Đăng ký</Text>
        <InputField
          label="Họ và tên"
          icon="user"
          value={email}
          onChangeText={setEmail}
          placeholder="Họ và tên"
        />
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

        <View style={styles.emailNotiWrapper}>
          <Checkbox value={isRemember} onValueChange={setIsRemember} />
          <Text style={styles.emailNotiText}>Tôi muốn nhận thông báo qua email</Text>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Đăng ký</Text>
        </TouchableOpacity>

        <View style={styles.signinContainer}>
          <Text style={styles.signinText}>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={moveToSignIn}>
            <Text style={styles.signinLink}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
        <Divider text="hoặc" />
        <SocialsignupButton iconSource={images.google} text="Đăng nhập bằng Google" />
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

const SocialsignupButton = ({ iconSource, text }: { iconSource: any; text: string }) => (
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
  emailNotiWrapper: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  emailNotiText: {
    marginLeft: 16,
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
  signupButton: {
    backgroundColor: colors.primary[500],
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  signupButtonText: {
    color: colors.white[50],
    fontSize: 20,
    fontFamily: fonts.beVietnamPro.bold,
  },
  signinContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  signinText: { fontSize: 18, fontFamily: fonts.beVietnamPro.regular },
  signinLink: {
    fontSize: 18,
    color: colors.blue[500],
    textDecorationLine: 'underline',
    fontFamily: fonts.beVietnamPro.bold,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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

export default SignUp;
