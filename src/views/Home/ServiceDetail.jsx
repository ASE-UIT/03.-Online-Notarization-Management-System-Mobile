import { useRoute, useState } from '@react-navigation/native';
import { colors, fonts } from '@theme';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const ServiceDetail = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const { serviceId } = route.params;

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
      <Text style={styles.title}>Service Detail {serviceId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white[500],
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.regular,
    color: colors.black,
  },
});

export default ServiceDetail;
