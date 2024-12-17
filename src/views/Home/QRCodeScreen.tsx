import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserSlice } from '@modules/user';

export default function QRCodeScreen() {
  const { user } = useUserSlice();
  return (
    <View style={styles.container}>
      <QRCode
        value={user?.id}
        size={200}
        logo={require('@assets/images/logo-sm.png')}
        logoSize={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
});
