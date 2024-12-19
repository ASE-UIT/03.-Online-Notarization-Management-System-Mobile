import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { colors, fonts } from '@theme';
import { SessionCard } from '@components/SessionCard';
import { ISession } from '@modules/session/session.typeDefs';
import SessionService from '@modules/session/session.service';
import { StackProps } from '@navigator';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { DocumentStatusCode } from '@utils/constants';

export default function Session({ navigation }: Readonly<StackProps>) {
  const [searching, setSearching] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<DocumentStatusCode | null>(null);

  const STATUS_OPTIONS: { label: string; value: DocumentStatusCode | null }[] = [
    { label: 'Tất cả', value: null },
    { label: 'Không xác định', value: 'unknown' },
    { label: 'Chờ xử lý', value: 'pending' },
    { label: 'Đang xử lý', value: 'processing' },
    { label: 'Chờ ký số', value: 'digitalSignature' },
    { label: 'Đã hoàn thành', value: 'completed' },
    { label: 'Bị từ chối', value: 'rejected' },
  ];

  const fetchData = useCallback(async () => {
    try {
      setSearching(true);
      const fetchedSessions = await SessionService.getSessionByUserId();
      console.log(fetchedSessions);
      setSessions(fetchedSessions);
    } catch (error) {
      console.log('Error fetching session', error);
    } finally {
      setSearching(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const navigateToSessionDetail = useCallback(
    (session: ISession) => {
      navigation.navigate('SessionDetailStack', { session });
    },
    [navigation],
  );

  const handleSearch = useCallback(() => {
    setSearching(true);
    setSearching(false);
  }, []);

  const handleStatusSelect = useCallback((status: DocumentStatusCode | null) => {
    setSelectedStatus(status);
  }, []);

  const filteredSessions = useMemo(() => {
    return sessions.filter(
      session =>
        (sessionName === '' ||
          session.sessionName.toLowerCase().includes(sessionName.toLowerCase())) &&
        (selectedStatus === null || session.status.status === selectedStatus),
    );
  }, [sessions, sessionName, selectedStatus]);

  const renderSessionCards = useCallback(() => {
    return filteredSessions.map((session: ISession) => (
      <Pressable
        key={`${session._id}-${session.sessionName}`}
        onPress={() => navigateToSessionDetail(session)}>
        <SessionCard session={session} />
      </Pressable>
    ));
  }, [filteredSessions, navigateToSessionDetail]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Phiên công chứng</Text>
        <Text style={styles.subTitle}>Toàn bộ phiên công chứng của bạn sẽ hiển thị ở đây</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên phiên công chứng"
          value={sessionName}
          onChangeText={setSessionName}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <FontAwesome name="search" size={20} color={colors.primary[400]} />
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {STATUS_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.filterButton,
                selectedStatus === option.value && styles.filterButtonActive,
              ]}
              onPress={() => handleStatusSelect(option.value)}>
              <Text
                style={[
                  styles.filterButtonText,
                  selectedStatus === option.value && styles.filterButtonTextActive,
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.resultCountContainer}>
        <Text style={styles.redSubTitle}>Tổng số phiên tìm thấy: {filteredSessions.length}</Text>
      </View>

      {searching ? (
        <ActivityIndicator size="large" color={colors.primary[400]} style={styles.loader} />
      ) : (
        <ScrollView style={styles.sessionCardWrapper} showsVerticalScrollIndicator={false}>
          {renderSessionCards()}
          <View style={styles.bottomPadding} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
    paddingHorizontal: '4%',
    paddingTop: '13%',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 5,
    paddingHorizontal: '2%',
    marginRight: '2%',
    fontFamily: fonts.beVietnamPro.regular,
    fontSize: 14,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white[50],
    height: 45,
    paddingHorizontal: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  searchButtonText: {
    marginLeft: '3%',
    color: colors.primary[400],
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 14,
  },
  loader: {
    marginTop: '5%',
  },
  filterContainer: {
    marginVertical: '4%',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray[300],
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: colors.primary[400],
    borderColor: colors.primary[400],
  },
  filterButtonText: {
    fontSize: 13,
    fontFamily: fonts.beVietnamPro.semiBold,
    color: colors.gray[600],
  },
  filterButtonTextActive: {
    color: colors.white[50],
  },
  resultCountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  redSubTitle: {
    marginVertical: '2%',
    fontSize: 15,
    fontFamily: fonts.beVietnamPro.bold,
    color: colors.primary[400],
  },
  sessionCardWrapper: {
    flex: 1,
  },
  bottomPadding: {
    height: 100,
  },
});
