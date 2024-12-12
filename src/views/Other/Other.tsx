import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import { colors } from '@theme'; // Thay thế nếu bạn có theme riêng

export default function Other({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <Image source={require('../Other/assets/Avatar.png')} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nguyễn Quốc Thắng 👋</Text>
            <Text style={styles.userEmail}>test@gmail.com</Text>
          </View>
        </View>
      </View>

      {/* Menu List */}
      <View style={styles.menuContainer}>
        {/* Menu Item 1 */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('ProfileStack')}>
          <AntDesign name="user" size={24} color={colors.black} />
          <Text style={styles.menuText}>Tài khoản của tôi</Text>
          <Entypo name="chevron-right" size={24} color={colors.gray} style={styles.menuIcon} />
        </TouchableOpacity>

        {/* Menu Item 2 */}
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="history" size={24} color={colors.black} />
          <Text style={styles.menuText}>Lịch sử công chứng</Text>
          <Entypo name="chevron-right" size={24} color={colors.gray} style={styles.menuIcon} />
        </TouchableOpacity>

        {/* Menu Item 3 */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('PolicyStack')}>
          <AntDesign name="filetext1" size={24} color={colors.black} />
          <Text style={styles.menuText}>Chính sách</Text>
          <Entypo name="chevron-right" size={24} color={colors.gray} style={styles.menuIcon} />
        </TouchableOpacity>

        {/* Menu Item 4 - Logout */}
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
          <Feather name="log-out" size={24} color="#A9302D" />
          <Text style={[styles.menuText, styles.logoutText]}>Đăng xuất</Text>
          <Entypo name="chevron-right" size={24} color="#A9302D" style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 10, // Thêm khoảng cách ở dưới cùng
  },
  headerWrapper: {
    paddingTop: 20, // Thêm khoảng cách phía trên
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: colors.black,
    flex: 1,
  },
  menuIcon: {
    marginLeft: 'auto',
  },
  logoutItem: {
    marginTop: 10,
  },
  logoutText: {
    color: '#A9302D',
  },
});
