import { CreateProgressBar, ForwardStepBar } from '@components/Bar';
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, fonts } from '@theme';
import { StackProps } from '@navigator';

const ConfirmInformation = ({ navigation }: StackProps) => {
  const [step, setStep] = useState(0);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNextStep = () => {};

  useFocusEffect(
    useCallback(() => {
      setStep(2);
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <CreateProgressBar currentPage={step} setCurrentPage={setStep} />
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.header}>Kiểm tra lại thông tin của bạn</Text>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Thông tin công chứng</Text>
            <View style={styles.informationContainer}>
              <Text style={styles.title}>Lĩnh vực công chứng:</Text>
              <Text style={styles.info}>Linh vuc cong chung</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Dịch vụ công chứng:</Text>
              <Text style={styles.info}>Dich vu cong chung</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Thông tin khách hàng</Text>
            <View style={styles.informationContainer}>
              <Text style={styles.title}>Họ và tên:</Text>
              <Text style={styles.info}>Nguyễn Văn A</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Số điện thoại:</Text>
              <Text style={styles.info}>0941788455</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Số CMND/CCCD:</Text>
              <Text style={styles.info}>0941788455</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Địa chỉ email:</Text>
              <Text style={styles.info}>0941788455</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Số lượng bản sao:</Text>
              <Text style={styles.info}>0941788455</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Danh sách tài liệu đã đăng tải</Text>
            <View style={styles.informationContainer}>
              <Text style={styles.title}>Lĩnh vực công chứng:</Text>
              <Text style={styles.info}>Linh vuc cong chung</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Dịch vụ công chứng:</Text>
              <Text style={styles.info}>Dich vu cong chung</Text>
            </View>
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
    fontSize: 16,
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
});

export default ConfirmInformation;
