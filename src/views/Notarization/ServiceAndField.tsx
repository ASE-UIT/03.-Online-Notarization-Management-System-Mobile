import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { colors, fonts } from '@theme';
import { StackProps } from '@navigator';
import { CreateProgressBar, ForwardStepBar } from '@components/Bar';
import NotarizationFieldService from '@modules/notarizationField/notarizationField.service';
import { INotarizationField } from '@modules/notarizationField';
import { INotarizationService, notarizationServiceService } from '@modules/notarizationService';
import Toast from 'react-native-toast-message';
import { useDocumentSlice } from '@modules/document';

const ServiceAndField = ({ navigation }: StackProps) => {
  const [step, setStep] = useState(0);
  const [selectedField, setSelectedField] = useState<INotarizationField | null>(null);
  const [fields, setFields] = useState<{ label: string; value: INotarizationField }[]>([]);
  const [isLoadingFields, setIsLoadingFields] = useState(true);

  const [selectedService, setSelectedService] = useState<INotarizationService | null>(null);
  const [services, setServices] = useState<{ label: string; value: INotarizationService }[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  const { dispatch, setServiceAndField } = useDocumentSlice();

  const handleNextStep = () => {
    if (!selectedField || !selectedService) {
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
        text2: 'Vui lòng chọn lĩnh vực và dịch vụ công chứng',
        visibilityTime: 2000,
        autoHide: true,
        position: 'bottom',
      });
      return;
    }

    dispatch(setServiceAndField({ service: selectedService, field: selectedField }));
    navigation.navigate('ProvideInformation');
  };

  useEffect(() => {
    const fetchFields = async () => {
      setIsLoadingFields(true);
      try {
        const response = await NotarizationFieldService.getAllNotarizationField();
        const fieldsData = response.map(field => ({
          label: field.name,
          value: field,
        }));
        setFields(fieldsData);
      } catch (error) {
        console.error('Error fetching notarization fields:', error);
      } finally {
        setIsLoadingFields(false);
      }
    };

    fetchFields();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedField?.id) return;
      setIsLoadingServices(true);
      try {
        const response = await notarizationServiceService.getNotarizationServicesByFieldId(
          selectedField.id,
        );
        const serviceData = response.map(service => ({
          label: service.name,
          value: service,
        }));
        setServices(serviceData);
      } catch (error) {
        console.error('Error fetching notarization services:', error);
      } finally {
        setIsLoadingServices(false);
      }
    };

    fetchServices();
  }, [selectedField]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <CreateProgressBar currentPage={step} setCurrentPage={setStep} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.header}>Chọn lĩnh vực công chứng và dịch vụ công chứng</Text>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Lĩnh Vực Công Chứng</Text>
            <Dropdown
              style={styles.inputContainer}
              data={
                isLoadingFields
                  ? [{ label: 'Loading...', value: {} as INotarizationField }]
                  : fields
              }
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
                data={
                  isLoadingServices
                    ? [{ label: 'Loading...', value: {} as INotarizationService }]
                    : services
                }
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[100],
    paddingTop: '23%',
  },
  main: {
    flex: 1,
    paddingTop: '3%',
    paddingHorizontal: '3%',
    alignContent: 'center',
    backgroundColor: colors.gray[50],
  },
  contentContainer: {
    flexGrow: 1,
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
    fontSize: 15,
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
