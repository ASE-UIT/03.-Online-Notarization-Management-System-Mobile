import { INotarizationField, notarizationFieldService } from '@modules/notarizationField';
import { INotarizationService, notarizationServiceService } from '@modules/notarizationService';
import { StackProps } from '@navigator';
import { useRoute } from '@react-navigation/native';
import { colors, fonts } from '@theme';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ServiceDetail = ({ navigation }: StackProps) => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const { serviceId } = route.params as { serviceId: string };
  const [service, setService] = useState<INotarizationService | null>(null);
  const [field, setField] = useState<INotarizationField | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await notarizationServiceService.getNotarizationServiceById(serviceId);
        setService(response);
      } catch {
        console.log('Error fetching service');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  useEffect(() => {
    const fetchField = async (fieldId: string) => {
      try {
        setLoading(true);
        if (fieldId) {
          const response = await notarizationFieldService.getNotarizationFieldById(fieldId);
          setField(response);
        }
      } catch {
        console.log('Error fetching field');
      } finally {
        setLoading(false);
      }
    };
    if (service?.fieldId) {
      fetchField(service.fieldId);
    }
  }, [service]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('de-DE') + ' VNĐ';
  };

  const handleCreateDocument = () => {
    navigation.navigate('CreateServiceAndField');
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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Mã số: #{serviceId}</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Thông tin dịch vụ</Text>
        <View style={styles.informationContainer}>
          <Text style={styles.title}>Tên dịch vụ:</Text>
          <Text style={styles.info}>{service?.name}</Text>
        </View>

        <View style={styles.informationContainer}>
          <Text style={styles.title}>Giá tiền:</Text>
          <Text style={styles.info}>{formatCurrency(service?.price ?? 0)}</Text>
        </View>

        <View style={styles.informationContainer}>
          <Text style={styles.title}>Thuộc lĩnh vực:</Text>
          <Text style={styles.info}>{field?.name}</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Các tài liệu cần thiết</Text>
        <View style={[styles.informationContainer, { flexDirection: 'column' }]}>
          {service?.description?.split('\n').map((line, index) => {
            const formattedLine = line.trim().replace(/^(\+|>|\s)*/, '');
            return (
              <Text key={`${formattedLine}-${index}`} style={styles.info}>
                • {formattedLine}
              </Text>
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.transferButton, { width: '100%' }]}
        onPress={handleCreateDocument}>
        <Text style={{ fontFamily: fonts.beVietnamPro.bold, color: '#fff' }}>Tạo hồ sơ ngay!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
    padding: '3%',
    alignContent: 'center',
    paddingVertical: '2%',
  },
  header: {
    color: colors.black,
    fontFamily: fonts.beVietnamPro.bold,
    fontSize: 18,
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
  sectionContainer: {
    marginVertical: '3%',
    marginHorizontal: '1%',
    padding: '2%',
    borderRadius: 10,
    borderColor: colors.gray[300],
    backgroundColor: colors.white[50],
    elevation: 5,
  },
  sectionHeader: {
    color: colors.black,
    fontFamily: fonts.beVietnamPro.bold,
    fontSize: 16,
  },
  informationContainer: {
    padding: '2%',
    backgroundColor: colors.white[50],
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    color: colors.black,
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 14,
    flex: 1,
  },
  info: {
    color: colors.black,
    fontFamily: fonts.beVietnamPro.regular,
    fontSize: 14,
    flex: 1.3,
  },
  transferButton: {
    backgroundColor: colors.primary[500],
    padding: '4%',
    marginTop: '3%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ServiceDetail;
