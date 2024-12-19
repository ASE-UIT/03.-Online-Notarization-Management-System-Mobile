import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React, { useState } from 'react';
import { colors, fonts } from '@theme';
import Feather from '@expo/vector-icons/Feather';
import { INFTItem } from '@modules/userWallet';
import Dialog from 'react-native-dialog';
import UserWalletService from '@modules/userWallet/userWallet.service';

export default function UserWalletCard({
  item,
  showBuyButton = false,
}: {
  item: INFTItem;
  showBuyButton?: boolean;
}) {
  const [currentAmount, setCurrentAmount] = useState(item.amount);
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const handleCancel = () => {
    setVisible(false);
  };
  const handleDelete = () => {
    const response = UserWalletService.buyNFT(item._id, amount);
    setCurrentAmount(currentAmount + amount);
    setVisible(false);
  };
  return (
    <View style={styles.cardWrapper}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('@assets/images/pdf-icon.png')}
            style={{ width: 80, height: 80, borderRadius: 10, marginRight: 16 }}
          />
          <View>
            <Text style={styles.cardTitleText} numberOfLines={2} ellipsizeMode="tail">
              {item.filename}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          {item.amount > 0 ? (
            <View style={[styles.amountWrapper, { backgroundColor: 'black' }]}>
              <Text
                style={{
                  color: colors.white[50],
                  fontSize: 14,
                  fontFamily: fonts.beVietnamPro.regular,
                }}>
                {currentAmount}
              </Text>
            </View>
          ) : (
            <View style={[styles.amountWrapper, { backgroundColor: colors.red[500] }]}>
              <Text
                style={{
                  color: colors.white[50],
                  fontSize: 14,
                  fontFamily: fonts.beVietnamPro.regular,
                }}>
                {item.amount}
              </Text>
            </View>
          )}
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
            <Text style={styles.dateTimeText}>
              {new Date(item.mintedAt).toLocaleDateString('en-GB')}
            </Text>
          </View>
          <View style={styles.dateTimeWrapper}>
            <Text style={styles.dateTimeText}>Ngày hết hạn:</Text>
            <Text style={styles.dateTimeText}>
              {new Date(
                new Date(item.mintedAt).setMonth(new Date(item.mintedAt).getMonth() + 6),
              ).toLocaleDateString('en-GB')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => {
            Linking.openURL(item.tokenURI);
          }}>
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
      {showBuyButton && (
        <View>
          <TouchableOpacity style={styles.buyButton} onPress={() => setVisible(true)}>
            <Text style={{ color: 'white', fontFamily: fonts.beVietnamPro.semiBold }}>
              Mua thêm
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Dialog.Container visible={visible} contentStyle={{ borderRadius: 10 }}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Input
          keyboardType="number-pad"
          placeholder="Nhập số lượng cần mua thêm"
          value={amount.toString()}
          onChangeText={text => setAmount(Number(text))}
        />
        <Dialog.Button label="Huỷ" onPress={handleCancel} />
        <Dialog.Button label="Xác nhận" onPress={handleDelete} />
      </Dialog.Container>
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
    width: 200,
  },
  amountWrapper: {
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
  buyButton: {
    backgroundColor: colors.red[500],
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});
