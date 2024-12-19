import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { colors, fonts } from '@theme';

interface SelectUploadFileProps {
  visible: boolean;
  onClose: () => void;
  onSelectLibrary: () => void;
  onSelectWallet: () => void;
}

const SelectUploadFile: React.FC<SelectUploadFileProps> = ({
  visible,
  onClose,
  onSelectLibrary,
  onSelectWallet,
}) => {
  return (
    <Modal animationType="none" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Tải tài liệu lên từ</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onSelectLibrary}>
                  <MaterialIcons name="photo-library" size={28} color={colors.primary[500]} />
                  <Text style={styles.buttonText}>Thư viện</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onSelectWallet}>
                  <Entypo name="wallet" size={28} color={colors.primary[500]} />
                  <Text style={styles.buttonText}>Ví của bạn</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SelectUploadFile;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundBlack,
    padding: '4%',
  },
  modalContent: {
    backgroundColor: colors.white[50],
    padding: '5%',
    borderRadius: 10,
    width: '100%',
  },
  title: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.beVietnamPro.bold,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '8%',
  },
  button: {
    flex: 1,
    marginHorizontal: '2%',
    padding: '4%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  buttonText: {
    marginTop: '5%',
    color: colors.primary[500],
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 15,
  },
});
