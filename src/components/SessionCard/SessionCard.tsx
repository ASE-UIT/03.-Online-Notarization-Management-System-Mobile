import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { ISession } from '@modules/session/session.typeDefs';
import { colors, fonts } from '@theme';
import { DocumentStatusCode, getDocumentStatusByCode } from '@utils/constants';

interface SessionCardProps {
  session: ISession;
}

const STATUS_COLORS: { [key in DocumentStatusCode]: string } = {
  digitalSignature: colors.blue[500],
  processing: colors.yellow[500],
  completed: colors.green[500],
  rejected: colors.red[500],
  pending: colors.gray[400],
  unknown: colors.gray[400],
};

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const daysLeft = useMemo(() => {
    const endDate = new Date(session.endDate);
    const currentDate = new Date();
    const timeDiff = endDate.getTime() - currentDate.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days > 0 ? `Còn ${days} ngày` : 'Đã kết thúc';
  }, [session.endDate]);

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardTop}>
        <View>
          <Text style={styles.sessionName}>{session.sessionName}</Text>
          <Text style={styles.creatorName}>tạo bởi {session.creator.name}</Text>
        </View>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.gray[300] }]} />
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.cardText}>Số người tham gia: </Text>
          <Text style={styles.cardText}>
            {session.users.length + 1} người ({session.users.length} người khác)
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.cardText}>Trạng thái: </Text>
          <Text
            style={[
              styles.cardText,
              {
                color: STATUS_COLORS[session.status as DocumentStatusCode] || colors.black,
              },
            ]}>
            {getDocumentStatusByCode(session.status as DocumentStatusCode)}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.timeWrapper,
          { backgroundColor: daysLeft === 'Đã kết thúc' ? colors.red[50] : colors.green[50] },
        ]}>
        <Feather
          name="clock"
          size={24}
          color={daysLeft === 'Đã kết thúc' ? colors.red[500] : colors.green[500]}
        />
        <Text
          style={[
            styles.timeText,
            {
              fontFamily: fonts.beVietnamPro.semiBold,
              color: daysLeft === 'Đã kết thúc' ? colors.red[500] : colors.green[500],
            },
          ]}>
          {daysLeft}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2%',
  },
  sessionName: {
    fontSize: 18,
    fontFamily: fonts.beVietnamPro.bold,
    color: colors.black,
  },
  creatorName: {
    fontSize: 14,
    color: colors.gray[300],
    fontFamily: fonts.beVietnamPro.regular,
  },
  divider: {
    height: 1,
    marginBottom: '2%',
  },
  infoContainer: {
    marginBottom: '3%',
  },
  avatarContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  extraUsersAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    borderWidth: 1,
  },
  extraUsersText: {
    color: '#fff',
  },
  timeWrapper: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  timeText: {
    color: '#ff0000',
    marginLeft: 8,
  },
  cardText: {
    fontSize: 14,
    fontFamily: fonts.beVietnamPro.semiBold,
    color: colors.gray[600],
    marginTop: '2%',
  },
});

export default SessionCard;
