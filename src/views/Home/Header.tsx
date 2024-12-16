import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const Header = ({ username }: { username: string }) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require('@assets/images/background_header.png')}>
      {/* Top Section */}
      <View style={styles.topSection}>
        {/* App Logo */}
        <View style={styles.leftSection}>
          <Image source={require('./assets/header/logo.png')} style={styles.logo} />
          <Text style={styles.title}>CongChungOnline</Text>
        </View>
        {/* Notification Button */}
        <TouchableOpacity style={styles.notificationContainer}>
          <Ionicons name="notifications" size={24} color={colors.yellow[500]} />
        </TouchableOpacity>
      </View>
      {/* User Info */}
      <View style={styles.userSection}>
        <View style={styles.userInforWrapper}>
          <Text style={styles.username}>{username}</Text>
          <MaterialIcons name="verified" size={24} color={colors.gray[500]} />
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('QR được nhấn!');
          }}
          style={styles.qrContainer}>
          <Ionicons name="qr-code-outline" size={32} color={colors.primary[300]} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical: 16,
    paddingTop: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 34,
    height: 34,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  icon: {
    width: 36,
    height: 36,
    marginLeft: 4,
    resizeMode: 'contain',
  },
  iconQR: {
    width: 36,
    height: 36,
    // position: 'absolute',
    // top: -17,
    // left: 120,
    resizeMode: 'contain',
  },
  notificationContainer: {
    backgroundColor: colors.yellow[50], // Màu vàng nhạt cho background
    borderRadius: 50, // Tạo hình tròn cho background
    padding: 12, // Khoảng cách giữa icon và viền background
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInforWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 50, // Tạo hình tròn cho background
    padding: 8, // Khoảng cách giữa icon và viền background
    alignItems: 'center',
    justifyContent: 'center',
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 8,
  },
});

export default Header;
