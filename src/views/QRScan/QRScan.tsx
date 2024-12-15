import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Overlay } from './Overlay';

export default function QRScan() {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const isPermissionGranted = Boolean(permission?.granted);
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          console.log(data);
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}
