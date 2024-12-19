import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { useRoute } from '@react-navigation/native';
import { colors, fonts } from '@theme';
import Toast from 'react-native-toast-message';
import FormData from 'form-data';
import { DocumentService } from '@modules/document';
import { StackProps } from '@navigator';
import * as FileSystem from 'expo-file-system';

const SignatureScreen = ({ navigation }: StackProps) => {
  const route = useRoute();
  const { documentId } = route.params as { documentId: string };
  const [loading, setLoading] = useState(false);

  const signatureRef = useRef<any>(null);

  const handleSave = () => {
    signatureRef.current?.readSignature();
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  const base64ToFile = async (base64Data: any, fileName: any) => {
    // Tách phần base64 từ header
    const base64Image = base64Data.split(';base64,').pop();

    // Xác định đường dẫn file để lưu
    const filePath = FileSystem.documentDirectory + fileName;

    try {
      // Ghi dữ liệu base64 vào file
      await FileSystem.writeAsStringAsync(filePath, base64Image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log('File saved at:', filePath);
      return filePath; // Trả về đường dẫn file đã lưu
    } catch (error) {
      console.error('Error writing file:', error);
      return null; // Trả về null nếu có lỗi
    }
  };

  const handleSignature = async (signature: string) => {
    if (signature) {
      const formData = new FormData();

      formData.append('documentId', documentId);
      const signatureFile = await base64ToFile(signature, `signature.png-${documentId}`);
      if (signatureFile) {
        console.log('Signature file path:', signatureFile);

        formData.append('signatureImage', {
          uri: signatureFile,
          type: 'image/png',
          name: `signature.png-${documentId}`,
        });

        setLoading(true);

        try {
          const result = await DocumentService.approveSignatureByUser(formData);
          console.log(result);
          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Chữ ký đã được lưu!',
            visibilityTime: 3000,
            autoHide: true,
            position: 'bottom',
          });
          navigation.navigate('SearchStack');
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('Failed to save signature file');
        Toast.show({
          type: 'error',
          text1: 'Có lỗi xảy ra',
          text2: 'Không thể lưu chữ ký!',
          visibilityTime: 2000,
          autoHide: true,
          position: 'bottom',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
        text2: 'Không có chữ ký trong ô!',
        visibilityTime: 2000,
        autoHide: true,
        position: 'bottom',
      });
    }
  };

  const handleEmpty = () => {
    Toast.show({
      type: 'error',
      text1: 'Có lỗi xảy ra',
      text2: 'Không có chữ ký trong ô!',
      visibilityTime: 2000,
      autoHide: true,
      position: 'bottom',
    });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary[400]} />
          <Text style={styles.loadingText}>Đang gửi yêu cầu...</Text>
        </View>
      )}
      <Text style={styles.header}>Hãy ký vào ô bên dưới</Text>

      <View style={styles.imageContainer}>
        <Signature
          ref={signatureRef}
          onOK={handleSignature}
          onEmpty={() => handleEmpty()}
          descriptionText=""
          webStyle={`
      .m-signature-pad--footer { display: none; } /* Ẩn nút mặc định */
    `}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleClear}>
          <Text style={styles.deleteButtonText}>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
    padding: '3%',
    alignItems: 'center',
  },
  header: {
    color: colors.black,
    fontFamily: fonts.beVietnamPro.bold,
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
  },
  imageContainer: {
    height: 300,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  signatureImage: {
    width: 200,
    height: 100,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButton: {
    paddingVertical: '4%',
    paddingHorizontal: '15%',
    borderRadius: 5,
    backgroundColor: colors.primary[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.white[50],
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 16,
  },
  saveButton: {
    paddingVertical: '4%',
    paddingHorizontal: '15%',
    borderRadius: 5,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.white[50],
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 16,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.backgroundBlack,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.bold,
    color: colors.red[500],
  },
});

export default SignatureScreen;
