import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { fonts } from '@theme';
import { formatDate, randerBackgroundColor, renderStatus, renderTextColor } from '@utils/helper';
import { INotarization } from '@modules/notarization/notarization.typeDefs';

function NotarizationCard({ item, onPress }: { item: INotarization; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={{
        margin: 8,
        backgroundColor: '#fff',
        elevation: 2,
        padding: 16,
        borderRadius: 8,
        flex: 1,
      }}
      onPress={onPress}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{ fontSize: 14, fontFamily: fonts.beVietnamPro.regular, maxWidth: 230 }}
          numberOfLines={2}>
          {item?.notarizationService.name}
        </Text>
        <View
          style={{
            backgroundColor: randerBackgroundColor(item?.status.status),
            padding: 8,
            borderRadius: 8,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: renderTextColor(item?.status.status),
            }}>
            {renderStatus(item?.status.status)}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 8 }}>
        <Text style={{ fontSize: 16, fontFamily: fonts.beVietnamPro.regular }}>
          Ngày công chứng:{' '}
          <Text style={{ fontFamily: fonts.beVietnamPro.bold }}>{formatDate(item?.createdAt)}</Text>
        </Text>
      </View>
      <View style={{ marginTop: 8 }}>
        <Text style={{ fontSize: 16, fontFamily: fonts.beVietnamPro.regular }}>
          Người yêu cầu:{' '}
          <Text style={{ fontFamily: fonts.beVietnamPro.bold }}>
            {item?.requesterInfo?.fullName}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default NotarizationCard;
