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
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { colors, fonts } from '@theme';
import CarouselComponent from '@components/CarouselComponent';
import { StackProps } from '@navigator';
import { FontAwesome, Foundation, Ionicons, MaterialIcons } from '@expo/vector-icons';

const services = [
  {
    id: '1',
    name: 'Công chứng hợp đồng vay tài sản',
    description: 'Cung cấp giải pháp chiến lược để phát triển bền vững.',
  },
  {
    id: '2',
    name: 'Công chứng hợp đồng bảo lãnh',
    description: 'Phát triển các giải pháp phần mềm theo yêu cầu.',
  },
  {
    id: '3',
    name: 'Công chứng hợp đồng tín chấp',
    description: 'Giúp doanh nghiệp cải thiện hiệu quả vận hành.',
  },
  {
    id: '4',
    name: 'Công chứng hợp đồng góp vốn bằng tài sản doanh nghiệp',
    description: 'Chương trình đào tạo nhân viên chuyên nghiệp.',
  },
  {
    id: '5',
    name: 'Công chứng văn bản nhận thừa kế',
    description: 'Đồng hành trong việc tích hợp trí tuệ nhân tạo.',
  },
  {
    id: '6',
    name: 'Công chứng văn bản khai nhận di sản thừa kế',
    description: 'Xây dựng website chuyên nghiệp và thân thiện.',
  },
  {
    id: '7',
    name: 'Công chứng hợp đồng chuyển nhượng quyền sử dụng đất nông nghiệp',
    description: 'Chiến lược quảng cáo tối ưu trên các nền tảng.',
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
      count: index - progress.value,
      animated: true,
    });
  };

  const handleCreateDocument = () => {
    navigation.navigate('CreateServiceAndField');
  };

  const handleViewMore = () => {
    navigation.navigate('Service');
    console.log('Xem thêm các dịch vụ khác');
  };

  const renderServices = (services: { id: string; name: string; description: string }[]) => {
    const processName = (name: string) => {
      if (name.startsWith('Công chứng ')) {
        const newName = name.replace('Công chứng ', '');
        return newName.charAt(0).toUpperCase() + newName.slice(1);
      }
      return name;
    };

    const rows = [];
    for (let i = 0; i < services.length; i += 4) {
      rows.push(services.slice(i, i + 4));
    }

    if (rows.length > 0 && rows[rows.length - 1].length < 8) {
      rows[rows.length - 1].push({ id: 'more', name: 'Xem thêm', description: '' });
    } else {
      rows.push([{ id: 'more', name: 'Xem thêm', description: '' }]);
    }

    return rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map(service => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceItem}
            onPress={service.id === 'more' ? handleViewMore : handleCreateDocument}>
            {service.id === 'more' ? (
              <Foundation name="indent-more" size={30} color={colors.primary[500]} />
            ) : (
              <Ionicons name="document-text" size={30} color={colors.primary[500]} />
            )}
            <Text style={styles.serviceText}>{processName(service.name)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Các loại dịch vụ</Text>
      <SafeAreaView>{renderServices(services)}</SafeAreaView>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: '2%',
    paddingHorizontal: '3%',
    paddingTop: '1%',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.beVietnamPro.bold,
    marginVertical: '2%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
    marginHorizontal: '2%',
  },
  serviceItem: {
    alignItems: 'center',
    width: '22%',
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 14,
    fontFamily: fonts.beVietnamPro.semiBold,
    color: colors.black,
    textAlign: 'center',
  },
});
