import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { colors, fonts } from '@theme';
import { StackProps } from '@navigator';
import { CreateProgressBar, ForwardStepBar } from '@components/Bar';
import NotarizationFieldService from '@modules/notarizationField/notarizationField.service';
import { INotarizationField } from '@modules/notarizationField';
import { INotarizationService, notarizationServiceService } from '@modules/notarizationService';

const ServiceAndField = ({ navigation }: StackProps) => {
  const [step, setStep] = useState(0);
  const [selectedField, setSelectedField] = useState<INotarizationField | null>(null);
  const [fields, setFields] = useState<{ label: string; value: INotarizationField }[]>([]);

  const [selectedService, setSelectedService] = useState<INotarizationService | null>(null);
  const [services, setServices] = useState<{ label: string; value: INotarizationService }[]>([]);

  const handleNextStep = () => {
    navigation.navigate('ProvideInformation');
  };

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await NotarizationFieldService.getAllNotarizationField();

        const fieldsData = response.map(field => ({
          label: field.name,
          value: field,
        }));

        setFields(fieldsData);
      } catch (error) {
        console.error('Error fetching notarization fields:', error);
      }
    };

    fetchFields();
  }, []);

  useEffect(() => {
    console.log('Selected field:', selectedField);

    const fetchServices = async () => {
      try {
        if (selectedField?.id) {
          const response = await notarizationServiceService.getNotarizationServicesByFieldId(
            selectedField.id,
          );

          const serviceData = response.map(service => ({
            label: service.name,
            value: service,
          }));
          setServices(serviceData);
        }
      } catch (error) {
        console.error('Error fetching notarization services:', error);
      }
    };

    fetchServices();
  }, [selectedField]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <CreateProgressBar currentPage={step} setCurrentPage={setStep} />
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.header}>Chọn lĩnh vực công chứng và dịch vụ công chứng</Text>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Lĩnh Vực Công Chứng</Text>
            <Dropdown
              style={styles.inputContainer}
              data={fields}
              labelField="label"
              valueField="value"
              placeholder="Chọn lĩnh vực công chứng"
              placeholderStyle={{ color: colors.gray[300] }}
              onChange={item => setSelectedField(item.value)}
            />

            <Text style={styles.sectionHeader}>Dịch vụ Công Chứng</Text>
            {selectedField ? (
              <Dropdown
                style={styles.inputContainer}
                data={services}
                labelField="label"
                valueField="value"
                placeholder="Chọn dịch vụ công chứng"
                placeholderStyle={{ color: colors.gray[300] }}
                onChange={item => setSelectedService(item.value)}
              />
            ) : (
              <Text style={styles.placeHolder}>Vui lòng chọn lĩnh vực công chứng trước</Text>
            )}
          </View>
        </ScrollView>
      </View>
      <ForwardStepBar step={1} totalStep={3} onNext={handleNextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[100],
  },
  main: {
    paddingTop: '3%',
    paddingHorizontal: '3%',
    flex: 1,
    alignContent: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingVertical: '2%',
  },
  header: {
    color: colors.black,
    fontFamily: fonts.beVietnamPro.bold,
    fontSize: 18,
  },
  sectionContainer: {
    marginVertical: '3%',
    marginHorizontal: '1%',
    padding: '2%',
    borderRadius: 10,
    borderColor: colors.gray[300],
    backgroundColor: colors.white[100],
    elevation: 3,
  },
  sectionHeader: {
    color: colors.black,
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 16,
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 10,
    paddingLeft: '3%',
    marginVertical: '2%',
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.regular,
    color: colors.black,
    backgroundColor: colors.white[100],
  },
  placeHolder: {
    marginLeft: '2%',
    marginTop: '2%',
    color: colors.gray[300],
  },
});

export default ServiceAndField;
