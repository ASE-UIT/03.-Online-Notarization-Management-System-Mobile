import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const services = [
  { id: 1, name: 'Vay - Mượn Tài sản' },
  { id: 2, name: 'Vay - Mượn Tài sản' },
  { id: 3, name: 'Vay - Mượn Tài sản' },
  { id: 4, name: 'Vay - Mượn Tài sản' },
];

const information = [
  {
    id: 1,
    title:
      'Nghị định 147/2024/NĐ-CP quản lý, cung cấp, sử dụng dịch vụ Internet và thông tin trên mạng',
    issued: '09/11/2024',
    updated: '11/11/2024',
  },
  {
    id: 2,
    title:
      'Nghị định 147/2024/NĐ-CP quản lý, cung cấp, sử dụng dịch vụ Internet và thông tin trên mạng',
    issued: '09/11/2024',
    updated: '11/11/2024',
  },
  {
    id: 3,
    title:
      'Nghị định 147/2024/NĐ-CP quản lý, cung cấp, sử dụng dịch vụ Internet và thông tin trên mạng',
    issued: '09/11/2024',
    updated: '11/11/2024',
  },
];

export default function Main() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Các loại dịch vụ */}
        <Text style={styles.section}>Các loại dịch vụ</Text>
        <SafeAreaView>
          {/* ScrollView ngang cho các dịch vụ */}
          <ScrollView horizontal style={styles.scrollView} showsHorizontalScrollIndicator={false}>
            {services.map(service => (
              <View key={service.id} style={styles.serviceItem}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('icon được nhấn!');
                  }}>
                  <Image source={require('./assets/main/Icon.png')} style={styles.serviceIcon} />
                </TouchableOpacity>
                <Text style={styles.serviceText}>{service.name}</Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
        {/* Tại sao nên sử dụng dịch vụ */}
        <Text style={styles.sectionTitle}>Tại sao nên sử dụng dịch vụ của chúng tôi</Text>
        <Image
          source={require('./assets/main/imageEx.png')} // Đường dẫn đến hình ảnh minh họa
          style={styles.mainImage}
        />
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.activeDot} />
          <View style={styles.dot} />
        </View>
        {/* Thông tin */}
        <Text style={styles.sectionTitle}>Thông tin</Text>
        {information.map(info => (
          <View key={info.id} style={styles.infoCard}>
            <Text style={styles.infoTitle}>{info.title}</Text>
            <Text style={styles.infoDetails}>
              Ban hành: {info.issued} | Cập nhật: {info.updated}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollView: {
    marginBottom: 10,
  },
  serviceItem: {
    alignItems: 'center',
    marginRight: 16, // Khoảng cách giữa các item
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 14,
    color: '#333',
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C62828',
    marginHorizontal: 4,
  },
  infoCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoDetails: {
    fontSize: 12,
    color: '#6C757D',
  },
});
