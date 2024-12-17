import { CreateProgressBar, ForwardStepBar } from '@components/Bar';
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, fonts } from '@theme';
import { StackProps } from '@navigator';
import * as DocumentPicker from 'expo-document-picker';
import Toast from 'react-native-toast-message';
import { useDocumentSlice } from '@modules/document';
import { getDocumentNameByCode, DocumentTypeCode } from '@utils/constants';
import { Feather } from '@expo/vector-icons';

type FileType = {
  name: string;
  uri: string;
  size: number;
  mimeType: string;
};

const ProvideInformation = ({ navigation }: StackProps) => {
  const { dispatch, setRequesterInfo, notarizationService, addFile } = useDocumentSlice();
  const [step, setStep] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: any }>({});

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [copyNumber, setCopyNumber] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setStep(1);
    }, []),
  );

  const handleNextStep = () => {
    if (!fullName || !email || !phoneNumber || copyNumber <= 0 || !idNumber) {
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
        text2: 'Vui lòng nhập đầy đủ thông tin công chứng',
        visibilityTime: 2000,
        autoHide: true,
        position: 'bottom',
      });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi email',
        text2: 'Vui lòng nhập đúng định dạng email',
        visibilityTime: 2000,
        autoHide: true,
        position: 'bottom',
      });
      return;
    }

    const missingDocuments =
      notarizationService?.required_documents.filter(
        document => !selectedFiles[document] || selectedFiles[document].length === 0,
      ) ?? [];

    if (missingDocuments.length > 0) {
      const missingDocNames = missingDocuments
        .map(doc => getDocumentNameByCode(doc as DocumentTypeCode))
        .join(', ');

      Toast.show({
        type: 'error',
        text1: 'Thiếu tài liệu',
        text2: `Vui lòng tải lên: ${missingDocNames}`,
        visibilityTime: 3000,
        position: 'bottom',
      });

      return;
    }
    dispatch(
      setRequesterInfo({ fullName, email, phoneNumber, citizenId: idNumber, amount: copyNumber }),
    );

    dispatch(addFile(selectedFiles));
    navigation.navigate('ConfirmInformation');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const pickFile = async (document: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true,
      });

      const VALID_FORMATS = ['pdf', 'jpg', 'png', 'jpeg'];
      const timestamp = new Date().getTime();

      const files = result.assets ?? result.output ?? [];
      const updatedFiles: FileType[] = [];

      files.forEach((file, index) => {
        const originalFileName = file.name || `file_${index}`;
        const fileExtension = originalFileName.split('.').pop();

        if (!VALID_FORMATS.some(format => fileExtension?.toLowerCase() === format)) {
          Toast.show({
            type: 'error',
            text1: 'Tài liệu không hợp lệ',
            text2: `${originalFileName} không đúng định dạng. Chỉ PDF và ảnh được hỗ trợ`,
            visibilityTime: 2000,
            position: 'bottom',
          });
          return;
        }

        const newFileName = `${document}_${timestamp}.${fileExtension}`;
        const renamedFile: FileType = {
          name: newFileName,
          uri: file.uri,
          mimeType: file.mimeType ?? 'application/octet-stream',
          size: file.size ?? 0,
        };

        updatedFiles.push(renamedFile);
      });

      if (updatedFiles.length > 0) {
        setSelectedFiles(prevState => ({
          ...prevState,
          [document]: [...(prevState[document] || []), ...updatedFiles],
        }));

        Toast.show({
          type: 'success',
          text1: 'Tải tệp thành công',
          text2: `Đã chọn ${updatedFiles.length} tệp.`,
          visibilityTime: 2000,
          position: 'bottom',
        });
      } else {
        console.log('Không có file nào hợp lệ để tải lên.');
      }
    } catch (error) {
      console.log('Unknown error: ', error);
    }
  };

  const deleteFile = (document: string, fileIndex: number) => {
    setSelectedFiles(prevState => {
      const updatedFiles = [...(prevState[document] || [])];
      updatedFiles.splice(fileIndex, 1);

      if (updatedFiles.length === 0) {
        const { [document]: _, ...rest } = prevState;
        return rest;
      }

      return {
        ...prevState,
        [document]: updatedFiles,
      };
    });
  };

  const renderFieldsToUpload = () => {
    return notarizationService?.required_documents.map((document: string, index: number) => (
      <View key={document} style={{ marginVertical: '2%' }}>
        <View style={styles.uploadFileHeaderContainer}>
          <Text style={[styles.sectionHeader, { flex: 1 }]}>
            {getDocumentNameByCode(document as DocumentTypeCode)}{' '}
            {selectedFiles[document]?.length > 0 && `(${selectedFiles[document].length} tệp)`}
          </Text>
          <Pressable style={styles.uploadFileButton} onPress={() => pickFile(document)}>
            <Text style={styles.addText}>Thêm tệp</Text>
          </Pressable>
          <View />
        </View>

        {selectedFiles[document] && selectedFiles[document].length > 0 && (
          <View style={styles.filesUploadedContainer}>
            {selectedFiles[document].map((file: FileType, fileIndex: number) => (
              <View key={`${document}_${fileIndex}`} style={styles.fileRow}>
                <Text style={styles.filesText}>{file.name}</Text>
                <Pressable
                  style={styles.deleteFileButton}
                  onPress={() => deleteFile(document, fileIndex)}>
                  <Feather name="x-circle" size={24} color={colors.gray[600]} />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </View>
    ));
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
              value={fullName}
              onChangeText={setFullName}
            />

            <Text style={styles.sectionHeader}>Số điện thoại</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder="Nhập số điện thoại"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
            />
            <Text style={styles.sectionHeader}>Số CMND/CCCD</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder="Nhập số CMND/CCCD"
              value={idNumber}
              onChangeText={setIdNumber}
              keyboardType="numeric"
            />
            <Text style={styles.sectionHeader}>Email</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder="Địa chỉ email"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.sectionHeader}>Số bản sao</Text>
            <TextInput
              style={styles.inputContainer}
              placeholder="Số lượng bản sao"
              value={copyNumber.toString()}
              onChangeText={text => {
                const numericValue = parseInt(text, 10);
                if (!isNaN(numericValue)) {
                  setCopyNumber(numericValue);
                }
              }}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.header}>Đăng tải các tài liệu cần thiết</Text>
          <View style={styles.sectionContainer}>{renderFieldsToUpload()}</View>
        </ScrollView>
      </View>
      <ForwardStepBar step={2} totalStep={3} onBack={handleBack} onNext={handleNextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '23%',
    backgroundColor: colors.white[50],
  },
  main: {
    flex: 1,
    paddingTop: '3%',
    paddingHorizontal: '3%',
    alignContent: 'center',
    backgroundColor: colors.white[100],
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
    backgroundColor: colors.white[50],
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
    fontSize: 14,
    fontFamily: fonts.beVietnamPro.regular,
    color: colors.black,
    backgroundColor: colors.white[50],
  },
  placeHolder: {
    color: colors.gray[300],
  },
  uploadFileHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadFileButton: {
    backgroundColor: colors.primary[100],
    padding: '2%',
    marginVertical: '2%',
    borderRadius: 10,
    alignItems: 'center',
  },
  addText: {
    color: colors.primary[400],
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 14,
  },
  filesUploadedContainer: {
    flex: 1,
    marginTop: '2%',
  },
  fileRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '3%',
  },
  filesText: {
    flex: 1,
    color: colors.gray[700],
    fontFamily: fonts.beVietnamPro.regular,
    fontSize: 12,
  },
  deleteFileButton: {},
});

export default ProvideInformation;
