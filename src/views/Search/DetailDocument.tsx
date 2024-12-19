import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors, fonts } from '@theme';
import { DocumentService, IDocumentHistoryStatus } from '@modules/document';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {
  DocumentStatusCode,
  DocumentTypeCode,
  getDocumentNameByCode,
  getDocumentStatusByCode,
} from '@utils/constants';
import { StackProps } from '@navigator';

const DetailDocument = ({ navigation }: StackProps) => {
  const route = useRoute();
  const { document } = route.params as { document: IDocumentHistoryStatus };

  const STATUS_COLORS: { [key in DocumentStatusCode]: string } = {
    digitalSignature: colors.blue[500],
    processing: colors.yellow[500],
    completed: colors.green[500],
    rejected: colors.red[500],
    pending: colors.gray[400],
  };

  const handleUrlPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Không thể mở URL:', err));
  };

  const renderFiles = () => {
    if (!document || !Array.isArray(document.files)) {
      return <Text style={styles.info}>Không có tài liệu nào được đăng tải.</Text>;
    }

    const { files } = document;
    return (
      <View>
        {files.map((file, index) => (
          <Pressable key={file._id} onPress={() => handleUrlPress(file.firebaseUrl)}>
            <Text style={styles.fileUrlInfo}>
              {`• ${file.filename}`}
              <FontAwesome5 name="external-link-alt" size={15} color={colors.primary[400]} />
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const handleSignature = (documentId: string) => {
    navigation.navigate('Signature', { documentId });
  };

  const renderOutputFiles = () => {
    if (!document || !Array.isArray(document.output) || document.output.length === 0) {
      return <Text style={styles.info}>Không có tài liệu phản hồi.</Text>;
    }

    const { output } = document;
    return (
      <View>
        {output.map((file, index) => (
          <Pressable key={file._id || index} onPress={() => handleUrlPress(file.firebaseUrl)}>
            <Text style={styles.fileUrlInfo}>
              {`• ${file.filename}`}
              <FontAwesome5 name="external-link-alt" size={15} color={colors.primary[400]} />
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Mã số: #{document._id}</Text>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Thông tin hồ sơ</Text>
            <View style={styles.informationContainer}>
              <Text style={styles.title}>Trạng thái hiện tại:</Text>
              <Text
                style={[
                  styles.info,
                  {
                    color:
                      STATUS_COLORS[document?.status.status as DocumentStatusCode] || colors.black,
                    fontFamily: fonts.beVietnamPro.semiBold,
                  },
                ]}>
                {getDocumentStatusByCode(document?.status.status as DocumentStatusCode)}
              </Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Ngày công chứng:</Text>
              <Text style={styles.info}>
                {new Date(document?.createdAt ?? '').toLocaleDateString('vi-VN')}
              </Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Phản hồi:</Text>
              <Text style={styles.info}>
                {(() => {
                  const feedback = document?.status.feedback;

                  if (!feedback) {
                    return 'Không có phản hồi.';
                  } else if (feedback.startsWith('Missing documents:')) {
                    const missingDocs = feedback
                      .replace('Missing documents:', '')
                      .split(',')
                      .map(doc => doc.trim())
                      .map(doc => getDocumentNameByCode(doc as DocumentTypeCode));

                    return `Thiếu tài liệu:\n${missingDocs.join('\n')}`;
                  } else {
                    return feedback;
                  }
                })()}
              </Text>
            </View>

            <Text style={styles.sectionHeader}>Tài liệu phản hồi</Text>
            {renderOutputFiles()}
          </View>

          {(document?.status.status === 'digitalSignature' ||
            document?.status.status === 'completed') && (
            <View style={[styles.sectionContainer, { width: '100%' }]}>
              <Text style={styles.sectionHeader}>Chữ kí điện tử của bạn</Text>
              <View style={styles.informationContainer}>
                {!!document?.signature?.signatureImage && (
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: document?.signature?.signatureImage }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                )}
                {!document?.signature?.signatureImage && (
                  <Pressable
                    style={styles.signatureButton}
                    onPress={() => handleSignature(document._id)}>
                    <Text style={styles.signatureButtonText}>Kí ngay!</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Thông tin công chứng</Text>
            <View style={styles.informationContainer}>
              <Text style={styles.title}>Lĩnh vực công chứng:</Text>
              <Text style={styles.info}>{document?.notarizationField.name}</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Dịch vụ công chứng:</Text>
              <Text style={styles.info}>{document?.notarizationService.name}</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Thông tin khách hàng</Text>
            <View style={styles.informationContainer}>
              <Text style={styles.title}>Họ và tên:</Text>
              <Text style={styles.info}>{document?.requesterInfo.fullName}</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Số điện thoại:</Text>
              <Text style={styles.info}>{document?.requesterInfo.phoneNumber}</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Số CMND/CCCD:</Text>
              <Text style={styles.info}>{document?.requesterInfo.citizenId}</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Địa chỉ email:</Text>
              <Text style={styles.info}>{document?.requesterInfo.email}</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Số lượng bản sao:</Text>
              <Text style={styles.info}>{document?.amount}</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Danh sách tài liệu đã đăng tải</Text>
            {renderFiles()}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
    padding: '3%',
  },
  main: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: colors.white[50],
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
    elevation: 5,
  },
  sectionHeader: {
    color: colors.black,
    fontFamily: fonts.beVietnamPro.bold,
    fontSize: 15,
  },
  informationContainer: {
    padding: '2%',
    backgroundColor: colors.white[50],
    flexDirection: 'row',
    justifyContent: 'center',
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
  fileUrlInfo: {
    color: colors.primary[400],
    fontFamily: fonts.beVietnamPro.semiBold,
    textDecorationLine: 'underline',
    fontSize: 15,
    flex: 1,
    marginVertical: '2%',
  },
  fileContainer: {
    padding: '2%',
    backgroundColor: colors.white[50],
    justifyContent: 'flex-start',
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureButton: {
    backgroundColor: colors.primary[500],
    padding: '3%',
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureButtonText: {
    color: colors.white[50],
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 14,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    flex: 1,
  },
});

export default DetailDocument;
