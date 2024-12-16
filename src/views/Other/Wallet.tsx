import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, fonts } from '@theme';
import Feather from '@expo/vector-icons/Feather';
import UserWalletCard from '@components/UserWalletCard';
import UserWalletService from '@modules/userWallet/userWallet.service';
import { IUserWallet } from '@modules/userWallet';

export default function Wallet() {
  const [userWallet, setUserWallet] = useState<IUserWallet>();
  useEffect(() => {
    const fetchUserWallet = async () => {
      try {
        const response = await UserWalletService.getUserWallet();
        setUserWallet(response);
        console.log('response', response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserWallet();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        {userWallet?.nftItems.map((item, index) => <UserWalletCard key={index} item={item} />)}
        <View style={{ marginBottom: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
