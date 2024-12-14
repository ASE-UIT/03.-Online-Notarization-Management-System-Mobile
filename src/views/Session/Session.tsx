import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { colors, fonts } from '@theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { SessionCard } from '@components/SessionCard';

export default function Session({ navigation }: { navigation: any }) {
  const navigateToAddSession = () => {
    navigation.navigate('AddSessionStack');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ fontSize: 24, fontFamily: fonts.beVietnamPro.bold, marginBottom: 8 }}>
          Phiên công chứng
        </Text>
        <Text
          style={{
            textDecorationLine: 'underline',
            color: colors.primary[400],
            fontSize: 14,
            fontFamily: fonts.beVietnamPro.regular,
          }}>
          Toàn bộ phiên công chứng của bạn sẽ hiển thị ở đây
        </Text>
      </View>
      <View style={styles.searchBox}>
        <AntDesign name="search1" size={28} color="black" />
        <TextInput
          placeholder="Tìm phiên công chứng"
          style={{ width: '95%', padding: 2, marginLeft: 4 }}
        />
      </View>
      <View style={styles.bodyHeader}>
        <Text style={{ fontFamily: fonts.beVietnamPro.bold, fontSize: 18 }}>Danh sách (10)</Text>
        <TouchableOpacity style={styles.addSessionButton} onPress={navigateToAddSession}>
          <AntDesign name="pluscircle" size={24} color={colors.primary[400]} />
          <Text
            style={{
              color: colors.primary[400],
              fontFamily: fonts.beVietnamPro.bold,
              marginLeft: 8,
            }}>
            Tạo phiên
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sessionCardWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SessionCard />
          <SessionCard />
          <SessionCard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  bodyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  addSessionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.primary[400],
    borderWidth: 1.5,
    padding: 8,
    borderRadius: 8,
  },
  sessionCardWrapper: {
    flex: 1,
  },
});
