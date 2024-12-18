import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '@theme';
import { INotarizationService, notarizationServiceService } from '@modules/notarizationService';
import { INotarizationField, notarizationFieldService } from '@modules/notarizationField';
import { StackProps } from '@navigator';

const Service = ({ navigation }: StackProps) => {
  const [fields, setFields] = useState<Record<string, INotarizationField>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [groupedServices, setGroupedServices] = useState<Record<string, INotarizationService[]>>(
    {},
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchServices = useCallback(async () => {
    try {
      const response = await notarizationServiceService.getAllNotarizationServices();
      return response;
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }, []);

  const fetchAllFields = useCallback(async () => {
    try {
      const response = await notarizationFieldService.getAllNotarizationField();
      return response;
    } catch (error) {
      console.error('Error fetching fields:', error);
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedServices, fetchedFields] = await Promise.all([
        fetchServices(),
        fetchAllFields(),
      ]);

      const fieldsMap = fetchedFields.reduce(
        (acc, field) => {
          acc[field.id] = field;
          return acc;
        },
        {} as Record<string, INotarizationField>,
      );

      setFields(fieldsMap);

      const grouped = fetchedServices.reduce(
        (acc, service) => {
          const { fieldId } = service;
          if (!acc[fieldId]) {
            acc[fieldId] = [];
          }
          acc[fieldId].push(service);
          return acc;
        },
        {} as Record<string, INotarizationService[]>,
      );

      setGroupedServices(grouped);
      setLoading(false);
    };

    fetchData();
  }, [fetchServices, fetchAllFields]);

  const processName = (name: string) => {
    if (name.startsWith('Công chứng ')) {
      const newName = name.replace('Công chứng ', '');
      return newName.charAt(0).toUpperCase() + newName.slice(1);
    }
    return name;
  };

  const renderServices = useCallback((fieldServices: INotarizationService[]) => {
    const columns = 4;
    const columnsData: INotarizationService[][] = new Array(columns).fill([]).map(() => []);

    fieldServices.forEach((service, index) => {
      const columnIndex = index % columns;
      columnsData[columnIndex].push(service);
    });

    const maxColumnLength = Math.max(...columnsData.map(col => col.length));
    const rows = Array.from({ length: maxColumnLength }, (_, rowIndex) =>
      columnsData.map(col => col[rowIndex] || null),
    );

    return rows.map((row, rowIndex) => (
      <View key={`row-${row.map(service => service?.id).join('-')}`} style={styles.row}>
        {row.map((service, colIndex) =>
          service ? (
            <Pressable
              key={service.id}
              style={styles.serviceItem}
              onPress={() => handleCreateDocument(service.id)}>
              <Ionicons name="document-text" size={30} color={colors.primary[500]} />
              <Text style={styles.serviceText}>{processName(service.name)}</Text>
            </Pressable>
          ) : (
            <View key={`empty-${rowIndex}-${colIndex}`} style={styles.serviceItem} />
          ),
        )}
      </View>
    ));
  }, []);

  const handleCreateDocument = useCallback((serviceId: string) => {
    navigation.navigate('ServiceDetail', { serviceId });
  }, []);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const filteredGroupedServices = useCallback(() => {
    if (!searchQuery) return groupedServices;

    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered: Record<string, INotarizationService[]> = {};

    Object.entries(groupedServices).forEach(([fieldId, fieldServices]) => {
      const matchingServices = fieldServices.filter(service =>
        service.name.toLowerCase().includes(lowercaseQuery),
      );

      if (matchingServices.length > 0) {
        filtered[fieldId] = matchingServices;
      }
    });

    return filtered;
  }, [groupedServices, searchQuery]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[400]} />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm dịch vụ..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {Object.entries(filteredGroupedServices()).map(([fieldId, fieldServices]) => (
        <View key={fieldId} style={styles.fieldSection}>
          <Text style={styles.fieldTitle}>{fields[fieldId]?.name || 'Unknown Field'}</Text>
          {renderServices(fieldServices)}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '3%',
    marginTop: '20%',
    backgroundColor: colors.white[100],
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.beVietnamPro.bold,
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 5,
    paddingHorizontal: '2%',
    marginVertical: '3%',
    fontFamily: fonts.beVietnamPro.regular,
    fontSize: 14,
    backgroundColor: colors.white[50],
  },
  fieldSection: {
    marginVertical: '3%',
    marginHorizontal: '1%',
    padding: '2%',
    borderRadius: 10,
    borderColor: colors.gray[300],
    backgroundColor: colors.white[50],
    elevation: 5,
  },
  fieldTitle: {
    fontSize: 18,
    fontFamily: fonts.beVietnamPro.bold,
    marginBottom: '3%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceItem: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceText: {
    marginTop: '2%',
    fontSize: 14,
    fontFamily: fonts.beVietnamPro.semiBold,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: colors.primary[400],
  },
});

export default Service;
