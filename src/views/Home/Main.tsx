import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { colors } from '@theme';
import CarouselComponent from '@components/CarouselComponent';
import { StackProps } from '@navigator';

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

const data = [
  { id: 1, source: require('@assets/images/imageEx.png') },
  { id: 2, source: require('@assets/images/imageEx.png') },
  { id: 3, source: require('@assets/images/imageEx.png') },
  { id: 4, source: require('@assets/images/imageEx.png') },
  { id: 5, source: require('@assets/images/imageEx.png') },
  { id: 6, source: require('@assets/images/imageEx.png') },
];
const windowWidth = Dimensions.get('window').width;

export default function Main({ navigation }: StackProps) {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  const handleCreateDocument = () => {
    navigation.navigate('CreateServiceAndField');
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Các loại dịch vụ */}
      <Text style={styles.section}>Các loại dịch vụ</Text>
      <SafeAreaView>
        {/* ScrollView ngang cho các dịch vụ */}
        <ScrollView horizontal style={styles.scrollView} showsHorizontalScrollIndicator={false}>
          {services.map(service => (
            <View key={service.id} style={styles.serviceItem}>
              <TouchableOpacity onPress={handleCreateDocument}>
                <Image source={require('./assets/main/Icon.png')} style={styles.serviceIcon} />
              </TouchableOpacity>
              <Text style={styles.serviceText}>{service.name}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
      {/* Tại sao nên sử dụng dịch vụ */}
      <Text style={styles.sectionTitle}>Tại sao nên sử dụng dịch vụ của chúng tôi</Text>
      <View>
        <CarouselComponent
          componentRef={ref}
          width={windowWidth}
          height={windowWidth / 2}
          data={data}
          progress={progress}
          color={colors.primary[300]}
          onPressPagination={onPressPagination}
        />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 8,
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
    width: 90,
    textAlign: 'center',
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
    marginHorizontal: 4,
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
