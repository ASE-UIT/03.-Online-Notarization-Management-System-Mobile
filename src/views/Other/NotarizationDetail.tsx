import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '@theme';
import { IFile, INotarization } from '@modules/notarization/notarization.typeDefs';
import Foundation from '@expo/vector-icons/Foundation';
import FileCard from '@components/FileCard';
import { randerBackgroundColor, renderStatus, renderTextColor } from '@utils/helper';

export default function NotarizationDetail({ route, navigation }: { route: any; navigation: any }) {
  const [notarization, setNotarization] = useState<INotarization>(route.params.notarization);
  const [images, setImages] = useState<IFile[]>([]);
  const [files, setFiles] = useState<IFile[]>([]);
  useEffect(() => {
    const divideImageAndFile = async () => {
      const images: IFile[] = [];
      const files: IFile[] = [];

      for (const item of notarization.files) {
        if (item.filename.endsWith('.png')) {
          images.push(item);
        } else if (item.filename.endsWith('.pdf')) {
          files.push(item);
        }
      }
      setImages(images);
      setFiles(files);
    };
    divideImageAndFile();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mã số: #{notarization._id}</Text>
      <View style={{ width: '100%' }}>
        <View
          style={{
            marginTop: 16,
            padding: 16,
            backgroundColor: randerBackgroundColor(notarization.status.status),
            borderRadius: 8,
            alignSelf: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.beVietnamPro.bold,
              color: renderTextColor(notarization.status.status),
            }}>
            {renderStatus(notarization.status.status)}
          </Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>THÔNG TIN KHÁCH HÀNG</Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.text}>Tên: </Text>
          <Text style={styles.text}>{notarization.requesterInfo.fullName}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.text}>Số CCCD/CMND: </Text>
          <Text style={styles.text}>{notarization.requesterInfo.citizenId}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.text}>Số điện thoại: </Text>
          <Text style={styles.text}>{notarization.requesterInfo.phoneNumber}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.text}>Email: </Text>
          <Text style={styles.text}>{notarization.requesterInfo.email}</Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>THÔNG TIN CÔNG CHỨNG</Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.text}>Lĩnh vực công chứng: </Text>
          <Text style={styles.text}>{notarization.notarizationField.name}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.text}>Dịch vụ công chứng: </Text>
          <Text style={styles.text}>{notarization.notarizationService.name}</Text>
        </View>
      </View>
      {images.length > 0 && (
        <View style={styles.wrapper}>
          <Text style={styles.title}>HÌNH ẢNH</Text>
          {images.map((image, index) => (
            <FileCard
              key={index}
              filename={image.filename}
              url={image.firebaseUrl}
              icon="picture"
            />
          ))}
        </View>
      )}
      {files.length > 0 && (
        <View style={styles.wrapper}>
          <Text style={styles.title}>TỆP</Text>
          {files.map((file, index) => (
            <FileCard key={index} filename={file.filename} url={file.firebaseUrl} icon="pdffile1" />
          ))}
        </View>
      )}
      <View style={styles.wrapper}>
        <Text style={styles.title}>GHI CHÚ</Text>
        <View style={{ marginTop: 8 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              borderRadius: 8,
              padding: 8,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                padding: 8,
                backgroundColor: colors.yellow[50],
                borderRadius: 50,
                alignContent: 'center',
                justifyContent: 'center',
                marginRight: 8,
              }}>
              <Foundation name="alert" size={24} color={colors.yellow[500]} />
            </View>
            <Text style={{ fontFamily: fonts.beVietnamPro.bold, maxWidth: '85%' }}>
              {notarization.status.feedback}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignScreenStack');
        }}>
        <Text>Ký số</Text>
      </TouchableOpacity>
      <View style={{ height: 200 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.beVietnamPro.bold,
  },
  wrapper: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.gray[50],
    borderRadius: 8,
    elevation: 2,
  },
  text: {
    marginTop: 8,
    fontFamily: fonts.beVietnamPro.bold,
    fontSize: 14,
  },
  noteWrapper: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
  },
});
