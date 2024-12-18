import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors, fonts, images } from '@theme';
import { Image } from 'expo-image';

export default function ForgetPassword({ navigation }: any) {
  const [email, setEmail] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.logo_lg} style={styles.logo} />
      <Text style={styles.title}>Quên mật khẩu?</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Nhập địa chỉ email của bạn"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={{ fontFamily: fonts.beVietnamPro.regular, color: '#fff' }}>Gửi yêu cầu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignInStack')}>
        <Text
          style={{
            marginTop: 16,

            fontFamily: fonts.beVietnamPro.regular,
          }}>
          Quay lại đăng nhập
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: { width: 100, height: 100, alignSelf: 'center', marginVertical: 24 },
  title: {
    fontFamily: fonts.beVietnamPro.bold,
    fontSize: 28,
    marginBottom: 24,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'black',
    width: '80%',
  },
  button: {
    padding: 12,
    backgroundColor: colors.primary[400],
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 16,
  },
});
