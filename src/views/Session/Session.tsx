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
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '@theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SessionCard } from '@components/SessionCard';
import { ISession } from '@modules/session/session.typeDefs';
import SessionService from '@modules/session/session.service';

export default function Session({ navigation, route }: { navigation: any; route: any }) {
  const [userSession, setUserSession] = useState<ISession[]>([]);
  const navigateToAddSession = () => {
    navigation.navigate('AddSessionStack');
  };

  useEffect(() => {
    const fetchData = async () => {
      const sessions = await SessionService.getSessionByUserId();
      setUserSession(sessions);
    };
    fetchData();
  }, []);

  const navigateToSessionDetail = (session: ISession) => {
    navigation.navigate('SessionDetailStack', { session });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Phiên công chứng</Text>
        <Text style={styles.subTitle}>Toàn bộ phiên công chứng của bạn sẽ hiển thị ở đây</Text>
      </View>
      <View style={styles.searchBox}>
        <AntDesign name="search1" size={28} color="black" />
        <TextInput
          placeholder="Tìm phiên công chứng"
          style={{ width: '95%', padding: 2, marginLeft: 4 }}
        />
      </View>
      <View style={styles.bodyHeader}>
        <Text style={{ fontFamily: fonts.beVietnamPro.bold, fontSize: 18 }}>
          Danh sách ({userSession.length})
        </Text>
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
          {userSession.map((session: ISession, index) => (
            <TouchableOpacity key={index} onPress={() => navigateToSessionDetail(session)}>
              <SessionCard session={session} />
            </TouchableOpacity>
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
    paddingHorizontal: '4%',
    paddingTop: '8%',
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
  title: {
    fontSize: 24,
    fontFamily: fonts.beVietnamPro.bold,
    color: colors.black,
  },
  subTitle: {
    textDecorationLine: 'underline',
    color: colors.primary[400],
    fontSize: 14,
    fontFamily: fonts.beVietnamPro.regular,
  },
});
