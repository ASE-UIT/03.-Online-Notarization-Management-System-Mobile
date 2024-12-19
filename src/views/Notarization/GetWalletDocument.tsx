import UserWalletCard from '@components/UserWalletCard';
import { INFTItem, IUserWallet } from '@modules/userWallet';
import UserWalletService from '@modules/userWallet/userWallet.service';
import { StackProps } from '@navigator';
import { useFocusEffect } from '@react-navigation/native';
import { colors, fonts } from '@theme';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Pressable } from 'react-native';

interface RouteParams {
  onGoBack?: (selectedNFT: INFTItem) => void;
}

const GetWalletDocument = ({
  navigation,
  route,
}: StackProps & { route: { params: RouteParams } }) => {
  const [userWallet, setUserWallet] = useState<IUserWallet>();
  const [selectedNFT, setSelectedNFT] = useState<INFTItem>();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserWallet();
    }, []),
  );

  const fetchUserWallet = async () => {
    try {
      setLoading(true);
      const response = await UserWalletService.getUserWallet();
      setUserWallet(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const sendObjectBack = () => {
    if (route.params?.onGoBack && selectedNFT) {
      route.params.onGoBack(selectedNFT);
    }
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[400]} />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.redTitle, { paddingVertical: '2%' }]}>
        Chọn tài liệu bạn muốn gửi đi
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {userWallet?.nftItems.map((item, index) => (
          <Pressable
            key={item._id}
            onPress={() => {
              const updatedItems = userWallet.nftItems.map((nftItem, i) => ({
                ...nftItem,
                selected: i === index,
              }));
              setUserWallet({ ...userWallet, nftItems: updatedItems });
              setSelectedNFT(item);
              if (selectedNFT) {
                sendObjectBack();
              }
            }}>
            <UserWalletCard item={item} />
          </Pressable>
        ))}
        <View style={{ marginBottom: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
    paddingTop: '23%',
    paddingHorizontal: '3%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white[100],
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.regular,
    color: colors.black,
  },
  redTitle: {
    color: colors.primary[500],
    fontFamily: fonts.beVietnamPro.bold,
    fontSize: 17,
  },
});

export default GetWalletDocument;
