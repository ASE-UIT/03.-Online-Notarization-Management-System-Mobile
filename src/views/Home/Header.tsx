import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons từ @expo/vector-icons
const Header = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.leftSection}>
        <Image source={require('./assets/header/logo.png')} style={styles.logo} />
        <Text style={styles.title}>CongChungOnline</Text>
      </View>

      {/* Notification Button */}
      <View style={styles.rightSection}>
        <TouchableOpacity
          onPress={() => {
            console.log('Thông báo được nhấn!');
          }}>
          <Image source={require('./assets/header/noti.png')} style={styles.iconNoti} />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userSection}>
        <Image source={require('./assets/header/Avatar.png')} style={styles.avatar} />
        <Text style={styles.username}>Nguyễn Quốc Thắng</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('Verified icon được nhấn!');
          }}>
          <Image source={require('./assets/header/VerifiedRounded.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('QR được nhấn!');
          }}>
          <Image source={require('./assets/header/QR.png')} style={styles.iconQR} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 34,
    height: 34,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  rightSection: {
    position: 'absolute',
    top: 16,
    right: 16,
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
    marginLeft: 110,
    resizeMode: 'contain',
  },
  iconNoti: {
    width: 40,
    height: 40,
    marginLeft: 12,
    resizeMode: 'contain',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 40,
    height: 40,
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
