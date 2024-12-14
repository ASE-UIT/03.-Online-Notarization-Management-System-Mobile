import { CreateProgressBar, ForwardStepBar } from '@components/Bar';
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, fonts } from '@theme';
import { StackProps } from '@navigator';
import * as DocumentPicker from 'expo-document-picker';

const ProvideInformation = ({ navigation }: StackProps) => {
  const [step, setStep] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<any | null>(null);
  const [selectedField, setSelectedField] = useState('');
  const handleNextStep = () => {
    navigation.navigate('ConfirmInformation');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const fieldsToUpload = [
    { key: 'cmnd', label: 'CMND/CCCD' },
    { key: 'contract', label: 'Hợp đồng' },
    { key: 'license', label: 'Giấy phép' },
    // Thêm các mục khác nếu cần
  ];

  const renderFieldsToUpload = () => {
    // return fieldsToUpload.map(field => (
    //   <View key={field.key}>
    //     <Text>{field.label}</Text>
    //     {selectedFiles[field.key]?.name ? (
    //       <Text>File: {selectedFiles[field.key].name}</Text>
    //     ) : (
    //       <Text>Chưa chọn tệp</Text>
    //     )}
    //     <Pressable onPress={() => pickFile}>
    //       <Text>Chọn tệp</Text>
    //     </Pressable>
    //   </View>
    // ));
  };

  useFocusEffect(
    useCallback(() => {
      setStep(1);
    }, []),
  );

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  // Hàm chọn tệp từ thiết bị
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // This allows all file types
      });

      setSelectedFiles(result);
    } catch (error) {
      console.log('Unknown error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <CreateProgressBar currentPage={step} setCurrentPage={setStep} />
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Thông tin yêu cầu</Text>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Họ và tên</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder="Nhập họ và tên"
              value={selectedField}
              onChangeText={setSelectedField}
            />

            <Text style={styles.sectionHeader}>Số điện thoại</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder="Nhập số điện thoại"
              value={selectedField}
              onChangeText={setSelectedField}
              keyboardType="numeric"
            />
            <Text style={styles.sectionHeader}>Số CMND/CCCD</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder="Nhập số CMND/CCCD"
              value={selectedField}
              onChangeText={setSelectedField}
            />
            <Text style={styles.sectionHeader}>Email</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder="Địa chỉ email"
              value={selectedField}
              onChangeText={setSelectedField}
            />
            <Text style={styles.sectionHeader}>Số bản sao</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder="Số lượng bản sao"
              value={selectedField}
              onChangeText={setSelectedField}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.header}>Đăng tải các tài liệu cần thiết</Text>
          <View style={styles.sectionContainer}>{renderFieldsToUpload()}</View>
        </ScrollView>
      </View>
      {selectedFiles?.assets?.[0] && <Text>File đã chọn: {selectedFiles.assets[0].name}</Text>}
      <Pressable onPress={pickFile} style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Chọn tệp</Text>
      </Pressable>
      <ForwardStepBar step={2} totalStep={3} onBack={handleBack} onNext={handleNextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[100],
  },
  main: {
    marginTop: '3%',
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
    color: colors.gray[300],
  },
});

export default ProvideInformation;
