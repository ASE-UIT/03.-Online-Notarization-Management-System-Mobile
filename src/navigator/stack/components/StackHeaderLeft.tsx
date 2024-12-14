import { Pressable, Modal, View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@theme';

export function StackHeaderLeft({ isCreateScreen }: { isCreateScreen: boolean }) {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const handleGoBack = () => {
    if (isCreateScreen) {
      setShowModal(true);
    } else {
      navigation.goBack();
    }
  };

  const confirmGoBack = () => {
    navigation.goBack();
    setShowModal(false);
  };

  return (
    <>
      <Pressable
        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
        onPress={handleGoBack}
        style={{ marginRight: 10 }}>
        <Ionicons name="chevron-back" size={24} />
      </Pressable>
      <Modal
        animationType="none"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Bạn có chắc chắn muốn quay về trang chủ?</Text>

            <View style={styles.infoContainer}>
              <Ionicons name="alert-circle-outline" size={20} color={colors.red[500]} />
              <Text style={styles.infoText}>
                Lưu ý: Nếu xác nhận, tất cả các thao tác của bạn bao gồm Tạo ảnh và Chỉnh sửa sẽ bị
                mất.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Pressable onPress={() => setShowModal(false)} style={styles.cancelButton}>
                  <Text style={[styles.buttonText, { color: colors.black[600] }]}>Hủy</Text>
                </Pressable>
                <Pressable onPress={confirmGoBack} style={styles.confirmButton}>
                  <Text style={styles.buttonText}>Xác nhận</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black[100],
    padding: '5%',
  },
  modalContent: {
    backgroundColor: colors.white[100],
    padding: '5%',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: colors.black[100],
    fontFamily: 'helvetica-neue-bold',
    lineHeight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '5%',
  },
  infoText: {
    marginLeft: '5%',
    fontSize: 14,
    lineHeight: 20,
    color: colors.black[100],
    fontFamily: 'helvetica-neue-medium',
  },
  cancelButton: {
    backgroundColor: colors.black[100],
    padding: '4%',
    borderRadius: 5,
    borderColor: colors.black[100],
    borderWidth: 1,
  },
  confirmButton: {
    backgroundColor: colors.black[100],
    padding: '4%',
    borderRadius: 5,
    marginLeft: '2%',
  },
  buttonText: {
    color: colors.white[100],
    fontSize: 12,
    fontFamily: 'helvetica-neue-bold',
  },
});
