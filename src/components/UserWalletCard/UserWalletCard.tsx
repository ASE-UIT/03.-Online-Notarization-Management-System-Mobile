import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, fonts } from '@theme';
import Feather from '@expo/vector-icons/Feather';

export default function UserWalletCard() {
  return (
    <View style={styles.cardWrapper}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('@assets/images/imageEx.png')}
            style={{ width: 80, height: 80, borderRadius: 10, marginRight: 16 }}
          />
          <View>
            <Text style={styles.cardTitleText}>Tên tài liệu</Text>
            <Text style={styles.cardTitleText}>Document Name</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={styles.amountWrapper}>
            <Text
              style={{
                color: colors.white[50],
                fontSize: 14,
                fontFamily: fonts.beVietnamPro.regular,
              }}>
              10
            </Text>
          </View>
        </View>
      </View>
      <View style={{ height: 1, flex: 1, backgroundColor: colors.gray[200], marginVertical: 16 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <View>
          <View style={styles.dateTimeWrapper}>
            <Text style={styles.dateTimeText}>Ngày nhận: {'    '}</Text>
            <Text style={styles.dateTimeText}>20/10/2023</Text>
          </View>
          <View style={styles.dateTimeWrapper}>
            <Text style={styles.dateTimeText}>Ngày hết hạn:</Text>
            <Text style={styles.dateTimeText}>20/10/2023</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.detailButton}>
          <Text
            style={{
              color: colors.white[50],
              fontSize: 14,
              fontFamily: fonts.beVietnamPro.regular,
              marginRight: 8,
            }}>
            Chi tiết
          </Text>
          <Feather name="alert-circle" size={24} color={colors.white[50]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#fff',
    margin: 8,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitleText: {
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.bold,
    marginBottom: 5,
  },
  amountWrapper: {
    backgroundColor: colors.black,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    padding: 4,
  },
  detailButton: {
    backgroundColor: colors.black,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
  },
  dateTimeWrapper: {
    flexDirection: 'row',
  },
  dateTimeText: {
    fontSize: 14,
    marginRight: 16,
    fontFamily: fonts.beVietnamPro.bold,
  },
});