import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors, fonts } from '@theme';

export default function FileCard({
  filename,
  url,
  icon,
}: {
  filename: string;
  url: string;
  icon: keyof typeof AntDesign.glyphMap;
}) {
  return (
    <View style={{ marginTop: 8 }}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(url);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          borderRadius: 8,
          padding: 8,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            padding: 8,
            backgroundColor: colors.yellow[50],
            borderRadius: 50,
            alignContent: 'center',
            justifyContent: 'center',
            marginRight: 8,
          }}>
          <AntDesign name={icon} size={24} color={colors.yellow[500]} />
        </View>
        <Text style={{ fontFamily: fonts.beVietnamPro.bold, maxWidth: '85%' }}>{filename}</Text>
      </TouchableOpacity>
    </View>
  );
}
