import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Overlay } from './Overlay';

export default function QRScan({ navigation }: { navigation: any }) {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const handleData = (result: { data: string }) => {
    // Replace with your navigation logic
    navigation.navigate('TransferNFTStack', {
      screen: 'TransferNFT',
      qrData: result.data,
    });
  };

  const isPermissionGranted = Boolean(permission?.granted);
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={result => handleData(result)}
      />
      <Overlay />
    </SafeAreaView>
  );
}
