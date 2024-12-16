import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Button,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { colors, fonts } from '@theme';
import UserWalletCard from '@components/UserWalletCard';
import { INFTItem, IUserWallet } from '@modules/userWallet';
import UserWalletService from '@modules/userWallet/userWallet.service';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TransferNFT({ navigation, route }: { navigation: any; route: any }) {
  const [qrData, setQrData] = useState(route.params.qrData);
  const [userWallet, setUserWallet] = useState<IUserWallet>();
  const [amount, setAmount] = useState(1);
  const [selectedNFT, setSelectedNFT] = useState<INFTItem>();
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  useEffect(() => {
    const fetchUserWallet = async () => {
      try {
        const response = await UserWalletService.getUserWallet();
        setUserWallet(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserWallet();
  }, []);
  const handleSendNFT = async () => {
    if (selectedNFT?.transactionHash) {
      const response = await UserWalletService.transferNFT(
        selectedNFT.transactionHash,
        qrData,
        amount,
      );
      console.log(response);
      navigation.navigate('HomeStack');
    } else {
      console.log('Transaction hash is undefined');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: fonts.beVietnamPro.bold, fontSize: 20 }}>
        Chuyển đến người dùng: Tran Tue Tanh
      </Text>
      <ScrollView>
        {userWallet?.nftItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              const updatedItems = userWallet.nftItems.map((nftItem, i) => ({
                ...nftItem,
                selected: i === index,
              }));
              setUserWallet({ ...userWallet, nftItems: updatedItems });
              setSelectedNFT(item);
            }}
            style={{
              borderWidth: item.selected ? 2 : 0,
              borderColor: item.selected ? colors.primary[400] : 'transparent',
              borderRadius: 8,
              padding: item.selected ? 8 : 0,
            }}>
            <UserWalletCard item={item} />
          </Pressable>
        ))}
        <View style={{ marginBottom: 32 }} />
      </ScrollView>
      <BottomSheetModalProvider>
        <TouchableOpacity onPress={handlePresentModalPress} style={styles.transferButton}>
          <Text style={{ fontFamily: fonts.beVietnamPro.bold, color: '#fff' }}>
            Chuyển tài liệu
          </Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          snapPoints={['25%', '50%']}
          style={{ backgroundColor: colors.gray[50] }}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.formWrapper}>
              <Text style={styles.textTitle}>Nhập số lượng: </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setAmount(amount + 1)}>
                  <AntDesign name="pluscircleo" size={40} color={colors.primary[500]} />
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 12,
                    fontFamily: fonts.beVietnamPro.bold,
                    fontSize: 20,
                    width: 30,
                    textAlign: 'center',
                  }}>
                  {amount}
                </Text>
                <TouchableOpacity onPress={() => setAmount(amount - 1)}>
                  <AntDesign name="minuscircleo" size={40} color={colors.primary[500]} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleSendNFT()} style={styles.transferButton}>
              <Text style={{ fontFamily: fonts.beVietnamPro.bold, color: '#fff' }}>
                Chuyển tài liệu
              </Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  formWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 10,
    elevation: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.gray[50],
    padding: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: fonts.beVietnamPro.bold,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.gray[50],
    padding: 16,
  },
  transferButton: {
    backgroundColor: colors.primary[500],
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
