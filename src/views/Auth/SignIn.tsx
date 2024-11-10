// src/views/Login/Login.tsx
import React, { useEffect, useState } from 'react';
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
import { colors, fonts, images, loadFonts, loadImages } from '@theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';

const SignIn = ({ navigation }: StackProps) => {
  const { dispatch, setLoggedIn, setUser } = useAppSlice();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleLogin = () => {
    const user = { name: 'Test User', email };
    dispatch(setUser(user));
    dispatch(setLoggedIn(true));
    navigation.navigate('HomeStack');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={images.logo_lg}
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
            marginVertical: 32,
          }}
        />
        <Text
          style={{
            fontSize: 40,
            color: colors.gray[900],
            alignSelf: 'center',
            marginBottom: 32,
            fontFamily: fonts.beVietnamPro.bold,
          }}>
          Đăng nhập
        </Text>
        <View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                color: colors.gray[800],
                marginBottom: 8,
                fontSize: 16,
                fontFamily: fonts.beVietnamPro.regular,
              }}>
              Email
            </Text>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: colors.gray[300],
                flexDirection: 'row',
                borderRadius: 8,
                padding: 12,
                alignContent: 'center',
              }}>
              <AntDesign name="mail" size={36} color={colors.gray[300]} />
              <TextInput
                style={{ flex: 1, marginLeft: 8 }}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
              />
            </View>
          </View>
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                color: colors.gray[800],
                marginBottom: 8,
                fontSize: 16,
                fontFamily: fonts.beVietnamPro.regular,
              }}>
              Mật khẩu
            </Text>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: colors.gray[300],
                flexDirection: 'row',
                borderRadius: 8,
                padding: 12,
                alignContent: 'center',
              }}>
              <AntDesign name="lock" size={36} color={colors.gray[300]} />
              <TextInput
                style={{ flex: 1, marginLeft: 8 }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Mật khẩu"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ justifyContent: 'center' }}>
                <AntDesign
                  name={showPassword ? 'eye' : 'eyeo'}
                  size={32}
                  color={colors.gray[300]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 24,
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox value={isRemember} onValueChange={setIsRemember} />
              <Text
                style={{
                  color: colors.gray[800],
                  fontSize: 16,
                  marginLeft: 8,
                  fontFamily: fonts.beVietnamPro.regular,
                }}>
                Ghi nhớ đăng nhập
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  color: colors.blue[500],
                  fontSize: 16,
                  textDecorationLine: 'underline',
                  fontFamily: fonts.beVietnamPro.bold,
                }}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary[500],
              padding: 12,
              borderRadius: 10,
              alignItems: 'center',
              marginBottom: 24,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.white[50],
                fontSize: 20,
                fontFamily: fonts.beVietnamPro.bold,
              }}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 40 }}>
            <Text style={{ fontSize: 18, fontFamily: fonts.beVietnamPro.regular }}>
              Chưa có tài khoản?{' '}
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  color: colors.blue[500],
                  textDecorationLine: 'underline',
                  fontFamily: fonts.beVietnamPro.bold,
                }}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 48,
              justifyContent: 'center',
            }}>
            <View style={styles.line}></View>
            <Text style={{ fontSize: 20, fontFamily: fonts.beVietnamPro.regular }}> hoặc </Text>
            <View style={styles.line}></View>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              borderColor: colors.gray[300],
              padding: 12,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image source={images.google} style={{ width: 40, height: 40 }} />
            <Text
              style={{
                color: colors.gray[700],
                marginLeft: 12,
                fontSize: 20,
                fontFamily: fonts.beVietnamPro.regular,
              }}>
              Đăng nhập bằng Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  line: {
    backgroundColor: colors.gray[100],
    height: 1,
    flex: 1,
    marginHorizontal: 16,
  },
});

export default SignIn;
