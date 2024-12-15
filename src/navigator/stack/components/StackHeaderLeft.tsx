import { Pressable, Modal, View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '@theme';

export function StackHeaderLeft({
  isCreateScreen,
  onConfirm,
  onBack,
}: Readonly<{
  isCreateScreen: boolean;
  onConfirm?: () => void;
  onBack?: () => void;
}>) {
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
    if (onConfirm) {
      onConfirm();
    } else {
      navigation.goBack();
    }

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
        transparent
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Bạn có chắc chắn muốn quay về trang chủ?</Text>

            <View style={styles.infoContainer}>
              <Ionicons name="alert-circle-outline" size={20} color={colors.red[500]} />
              <Text style={styles.infoText}>
                Lưu ý: Nếu xác nhận, tất cả các thao tác của bạn sẽ bị mất.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
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
    backgroundColor: colors.backgroundBlack,
    padding: '5%',
  },
  modalContent: {
    backgroundColor: colors.white[100],
    padding: '5%',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 15,
    color: colors.black[100],
    fontFamily: fonts.beVietnamPro.semiBold,
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
    color: colors.black,
    fontFamily: fonts.beVietnamPro.regular,
  },
  cancelButton: {
    backgroundColor: colors.black[100],
    padding: '4%',
    paddingHorizontal: '7%',
    borderRadius: 5,
    borderColor: colors.black[100],
    borderWidth: 1,
  },
  confirmButton: {
    backgroundColor: colors.primary[500],
    padding: '4%',
    paddingHorizontal: '3%',
    borderRadius: 5,
    marginLeft: '2%',
  },
  buttonText: {
    color: colors.white[100],
    fontSize: 13,
    fontFamily: fonts.beVietnamPro.bold,
  },
});
