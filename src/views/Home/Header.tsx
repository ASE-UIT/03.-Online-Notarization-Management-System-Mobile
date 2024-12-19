import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '@theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const Header = ({ username, onPress }: { username: string; onPress: () => void }) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require('@assets/images/background_header.png')}>
      <View style={styles.topSection}>
        <View style={styles.leftSection}>
          <Image source={require('./assets/header/logo.png')} style={styles.logo} />
          <Text style={styles.title}>ASE - Công chứng Online</Text>
        </View>
      </View>

      <View style={styles.userSection}>
        <View style={styles.userInforWrapper}>
          <Text style={styles.username}>{username}</Text>
          <MaterialIcons name="verified" size={24} color={colors.gray[500]} />
        </View>
        <TouchableOpacity onPress={onPress} style={styles.qrContainer}>
          <Ionicons name="qr-code-outline" size={28} color={colors.primary[400]} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: '3%',
    paddingTop: '10%',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical: '3%',
    paddingTop: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 34,
    height: 34,
    marginRight: '2%',
  },
  title: {
    fontFamily: fonts.beVietnamPro.bold,
    fontSize: 18,
    color: colors.white[50],
  },
  iconQR: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  userInforWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrContainer: {
    backgroundColor: colors.gray[50],
    borderRadius: 50,
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white[50],
    borderRadius: 16,
    padding: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  username: {
    fontSize: 15,
    fontFamily: fonts.beVietnamPro.semiBold,
    color: colors.black,
    marginRight: 8,
  },
});

export default Header;
