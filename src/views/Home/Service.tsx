import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@theme';
import { INotarizationService, notarizationServiceService } from '@modules/notarizationService';
import { notarizationFieldService } from '@modules/notarizationField';

const Service = () => {
  const [services, setServices] = useState<any[]>([]);
  const [fields, setFields] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [groupedServices, setGroupedServices] = useState<any>({});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await notarizationServiceService.getAllNotarizationServices();
        setServices(response);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchFieldById = async (fieldId: string) => {
      try {
        const response = await notarizationFieldService.getNotarizationFieldById(fieldId);
        return response;
      } catch (error) {
        console.error('Error fetching field:', error);
        return null;
      }
    };

    const groupServicesByFieldId = async () => {
      const grouped = services.reduce((acc, service) => {
        const { fieldId } = service;
        if (!acc[fieldId]) {
          acc[fieldId] = [];
        }
        acc[fieldId].push(service);
        return acc;
      }, {});

      const fieldPromises = Object.keys(grouped).map(async fieldId => {
        const fieldData = await fetchFieldById(fieldId);
        if (fieldData) {
          setFields(prev => ({ ...prev, [fieldId]: fieldData.name }));
        }
      });

      await Promise.all(fieldPromises);
      setGroupedServices(grouped);
      setLoading(false); // Set loading to false after both services and fields are fetched
    };

    const fetchData = async () => {
      await fetchServices();
      await groupServicesByFieldId();
    };

    fetchData();
  }, [services]);

  const processName = (name: string) => {
    if (name.startsWith('Công chứng ')) {
      const newName = name.replace('Công chứng ', '');
      return newName.charAt(0).toUpperCase() + newName.slice(1);
    }
    return name;
  };

  const renderServices = (fieldServices: INotarizationService[]) => {
    const rows = [];
    const columns = 4;

    const columnsData: INotarizationService[][] = new Array(columns).fill([]).map(() => []);

    fieldServices.forEach((service, index) => {
      const columnIndex = index % columns;
      columnsData[columnIndex].push(service);
    });

    const maxColumnLength = Math.max(...columnsData.map(col => col.length));
    for (let i = 0; i < maxColumnLength; i++) {
      const rowItems = columnsData.map(col => col[i] || null);
      rows.push(rowItems);
    }

    return rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((service, colIndex) =>
          service ? (
            <Pressable key={service.id} style={styles.serviceItem} onPress={handleCreateDocument}>
              <Ionicons name="document-text" size={30} color={colors.primary[500]} />
              <Text style={styles.serviceText}>{processName(service.name)}</Text>
            </Pressable>
          ) : (
            <View key={`empty-${colIndex}`} style={styles.serviceItem} />
          ),
        )}
      </View>
    ));
  };

  const handleCreateDocument = () => {
    console.log('Creating document...');
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
      <Text style={styles.title}>Các dịch vụ công chứng</Text>

      {Object.keys(groupedServices).map(fieldId => (
        <View key={fieldId} style={styles.fieldSection}>
          <Text style={styles.fieldTitle}>{fields[fieldId]}</Text>
          {groupedServices[fieldId] && renderServices(groupedServices[fieldId])}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fieldSection: {
    marginBottom: 20,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  serviceItem: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceText: {
    marginTop: 5,
    fontSize: 14,
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
