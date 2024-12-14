import { CreateProgressBar, ForwardStepBar } from '@components/Bar';
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, fonts } from '@theme';
import { StackProps } from '@navigator';
import { DocumentService, IUploadDocumentRequest, useDocumentSlice } from '@modules/document';
import Toast from 'react-native-toast-message';
import { DocumentTypeCode, getDocumentNameByCode } from '@utils/constants';
import { INotarizationService } from '@modules/notarizationService';
import { INotarizationField } from '@modules/notarizationField';
import FormData from 'form-data';
import Spinner from 'react-native-loading-spinner-overlay';

const ConfirmInformation = ({ navigation }: StackProps) => {
  const {
    dispatch,
    resetDocumentState,
    notarizationService,
    notarizationField,
    requesterInfo,
    amount,
    files,
    clearFiles,
  } = useDocumentSlice();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    dispatch(clearFiles());
    navigation.goBack();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleBack();
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const handleNextStep = async () => {
    const extractedFiles = Object.values(files[0]).flatMap(fileGroup => fileGroup);
    console.log(extractedFiles);
    const requestPayload: IUploadDocumentRequest = {
      notarizationService: notarizationService as INotarizationService,
      notarizationField: notarizationField as INotarizationField,
      requesterInfo,
      files: extractedFiles.map(file => ({
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
      })),
      amount,
    };

    const formData = new FormData();

    formData.append('notarizationService', JSON.stringify(requestPayload.notarizationService));
    formData.append('notarizationField', JSON.stringify(requestPayload.notarizationField));
    formData.append('requesterInfo', JSON.stringify(requestPayload.requesterInfo));
    formData.append('amount', requestPayload.amount);
    console.log(requestPayload.files);
    requestPayload.files.forEach(file => {
      formData.append('files', file);
    });

    setLoading(true);

    try {
      const result = await DocumentService.uploadDocument(formData);
      console.log(result);
      Toast.show({
        type: 'success',
        text1: 'Yêu cầu công chứng đã được tạo',
        text2: 'Vui lòng chờ chúng tôi xác nhận yêu cầu của bạn',
        visibilityTime: 3000,
        autoHide: true,
        position: 'bottom',
      });

      dispatch(resetDocumentState());
      navigation.navigate('HomeStack');
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setStep(2);
    }, []),
  );

  const renderFiles = () => {
    if (!Array.isArray(files)) {
      console.log('Expected files to be an array');
      return null;
    }

    console.log(files);

    return files.map((fileObj, index) => {
      if (fileObj && typeof fileObj === 'object') {
        return Object.entries(fileObj).map(([document, fileArray]) => {
          if (Array.isArray(fileArray)) {
            return (
              <View key={`${document}-${index}`} style={styles.fileContainer}>
                <Text style={styles.title}>
                  {getDocumentNameByCode(document as DocumentTypeCode)}
                </Text>
                {fileArray.map((file, fileIndex) => (
                  <Text key={`${file.uri}-${fileIndex}`} style={styles.info}>
                    • {file.name}
                  </Text>
                ))}
              </View>
            );
          }
          return null;
        });
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent="Đang tải..." textStyle={{ color: '#fff' }} />
      <View style={styles.main}>
        <CreateProgressBar currentPage={step} setCurrentPage={setStep} />
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Kiểm tra lại thông tin của bạn</Text>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Thông tin công chứng</Text>
            <View style={styles.informationContainer}>
              <Text style={styles.title}>Lĩnh vực công chứng:</Text>
              <Text style={styles.info}>{notarizationField?.name}</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Dịch vụ công chứng:</Text>
              <Text style={styles.info}>{notarizationService?.name}</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Thông tin khách hàng</Text>
            <View style={styles.informationContainer}>
              <Text style={styles.title}>Họ và tên:</Text>
              <Text style={styles.info}>{requesterInfo.fullName}</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Số điện thoại:</Text>
              <Text style={styles.info}>{requesterInfo.phoneNumber}</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Số CMND/CCCD:</Text>
              <Text style={styles.info}>{requesterInfo.citizenId}</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Địa chỉ email:</Text>
              <Text style={styles.info}>{requesterInfo.email}</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Số lượng bản sao:</Text>
              <Text style={styles.info}>{amount}</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Danh sách tài liệu đã đăng tải</Text>
            {renderFiles()}
          </View>
        </ScrollView>
      </View>

      <ForwardStepBar step={3} totalStep={3} onBack={handleBack} onNext={handleNextStep} />
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
    fontSize: 15,
  },
  informationContainer: {
    padding: '2%',
    backgroundColor: colors.white[100],
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  placeHolder: {
    color: colors.gray[300],
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
    flex: 1,
  },
  fileContainer: {
    padding: '2%',
    backgroundColor: colors.white[100],
    justifyContent: 'flex-start',
  },
});

export default ConfirmInformation;
