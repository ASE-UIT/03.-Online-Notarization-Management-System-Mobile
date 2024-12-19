import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors, fonts } from '@theme';
import UserWalletCard from '@components/UserWalletCard';
import { INFTItem, IUserWallet } from '@modules/userWallet';
import UserWalletService from '@modules/userWallet/userWallet.service';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StackProps } from '@navigator';
import UserService from '@modules/user/user.service';
import { IUser } from '@modules/user';
import Toast from 'react-native-toast-message';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function SendNFT({ navigation, route }: Readonly<StackProps>) {
  const [userWallet, setUserWallet] = useState<IUserWallet>();
  const [amount, setAmount] = useState(1);
  const [selectedNFT, setSelectedNFT] = useState<INFTItem>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<IUser>();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 150);

  useEffect(() => {
    const fetchUserWallet = async () => {
      try {
        const response = await UserWalletService.getUserWallet();
        setUserWallet(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserWallet();
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchQuery.trim() === '' || isManualSelection) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await UserService.searchUserByEmail(debouncedSearchQuery.trim());
        setSuggestions(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchQuery, isManualSelection]);

  const handleSearchInput = (text: string) => {
    setSearchQuery(text);
    setIsManualSelection(false);
  };

  const handleSelectUser = (user: any) => {
    setIsManualSelection(true);
    setSearchQuery(user.email);
    setSuggestions([]);
  };

  const handleConfirm = async () => {
    if (!searchQuery.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Vui lòng nhập email',
        visibilityTime: 2000,
        autoHide: true,
        position: 'bottom',
      });
      return;
    }

    try {
      let userToConfirm;
      if (isManualSelection) {
        userToConfirm = suggestions.find(
          user => user.email.toLowerCase() === searchQuery.trim().toLowerCase(),
        );
      }

      if (!userToConfirm) {
        const response = await UserService.searchUserByEmail(searchQuery.trim());
        userToConfirm = Array.isArray(response)
          ? response.find(user => user.email.toLowerCase() === searchQuery.trim().toLowerCase())
          : null;
      }

      if (userToConfirm) {
        setUser(userToConfirm);
        setSuggestions([]);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: 'Không tìm thấy người dùng phù hợp trong hệ thống',
          visibilityTime: 2000,
          autoHide: true,
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error confirming user:', error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Đã xảy ra lỗi, vui lòng thử lại',
        visibilityTime: 2000,
        autoHide: true,
        position: 'bottom',
      });
    }
  };

  const handleSendNFT = async () => {
    setIsLoading(true);
    try {
      if (selectedNFT?.transactionHash && user?.email) {
        if (selectedNFT?.amount < amount) {
          Toast.show({
            type: 'error',
            text1: 'Lỗi',
            text2: 'Số lượng tài liệu bạn chọn vượt quá số lượng hiện có',
            visibilityTime: 2000,
            autoHide: true,
            position: 'bottom',
          });
          return;
        }

        await UserWalletService.transferNFT(selectedNFT.transactionHash, user.email, amount);
        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Tài liệu đã được chuyển đến ví của người nhận!',
          visibilityTime: 2000,
          autoHide: true,
          position: 'bottom',
        });
        navigation.navigate('HomeStack');
      } else {
        console.log('Transaction hash or user email is undefined');
      }
    } catch (error) {
      console.error('Error sending NFT:', error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Đã xảy ra lỗi khi gửi tài liệu, vui lòng thử lại',
        visibilityTime: 2000,
        autoHide: true,
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAmount = () => {
    if (selectedNFT) {
      bottomSheetModalRef.current?.present();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Vui lòng chọn tài liệu cần gửi',
        visibilityTime: 2000,
        autoHide: true,
        position: 'bottom',
      });
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary[400]} />
          <Text style={styles.loadingText}>Đang gửi yêu cầu...</Text>
        </View>
      )}
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập email người nhận"
            value={searchQuery}
            onChangeText={handleSearchInput}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleConfirm}>
            <Text style={styles.searchButtonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.suggestionsContainer}>
          {suggestions.map(user => (
            <TouchableOpacity
              key={user.email}
              onPress={() => handleSelectUser(user)}
              style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>
                {user.email} - {user.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {user ? (
        <>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Thông tin người nhận</Text>
            <View style={styles.informationContainer}>
              <Text style={styles.title}>Tên người dùng:</Text>
              <Text style={styles.info}>{user?.name}</Text>
            </View>

            <View style={styles.informationContainer}>
              <Text style={styles.title}>Email:</Text>
              <Text style={styles.info}>{user?.email}</Text>
            </View>
          </View>

          <Text style={[styles.redTitle, { paddingVertical: '2%' }]}>
            Chọn tài liệu bạn muốn gửi đi
          </Text>

          <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
            {userWallet?.nftItems.map((item, index) => (
              <Pressable
                key={item._id}
                onPress={() => {
                  const updatedItems = userWallet.nftItems.map((nftItem, i) => ({
                    ...nftItem,
                    selected: i === index,
                  }));
                  setUserWallet({ ...userWallet, nftItems: updatedItems });
                  setSelectedNFT(item);
                }}
                style={{
                  borderWidth: item.selected ? 2 : 0,
                  borderColor: item.selected ? colors.primary[400] : 'transparent',
                  borderRadius: 8,
                }}>
                <UserWalletCard item={item} />
              </Pressable>
            ))}
            <View style={{ marginBottom: 32 }} />
          </ScrollView>

          <BottomSheetModalProvider>
            <TouchableOpacity onPress={handleSelectAmount} style={styles.transferButton}>
              <Text style={{ fontFamily: fonts.beVietnamPro.bold, color: '#fff' }}>
                Chuyển tài liệu
              </Text>
            </TouchableOpacity>

            <BottomSheetModal
              ref={bottomSheetModalRef}
              snapPoints={['25%', '50%']}
              style={{
                backgroundColor: colors.white[100],
              }}>
              <BottomSheetView style={styles.contentContainer}>
                <View style={styles.formWrapper}>
                  <Text style={styles.textTitle}>Nhập số lượng: </Text>
                  <View
                    style={{
                      paddingVertical: '4%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: '4%',
                    }}>
                    <TouchableOpacity onPress={() => setAmount(prev => prev + 1)}>
                      <AntDesign name="pluscircleo" size={40} color={colors.primary[500]} />
                    </TouchableOpacity>

                    <TextInput
                      style={{
                        marginHorizontal: 12,
                        fontFamily: fonts.beVietnamPro.bold,
                        fontSize: 20,
                        width: 50,
                        textAlign: 'center',
                        borderWidth: 1,
                        borderColor: colors.gray[300],
                        borderRadius: 8,
                        padding: 4,
                      }}
                      keyboardType="numeric"
                      value={String(amount)}
                      onChangeText={text => {
                        const parsedAmount = parseInt(text, 10);
                        setAmount(isNaN(parsedAmount) ? 0 : parsedAmount);
                      }}
                    />

                    <TouchableOpacity onPress={() => setAmount(prev => Math.max(prev - 1, 0))}>
                      <AntDesign name="minuscircleo" size={40} color={colors.primary[500]} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.transferButton, { width: '100%' }]}
                  onPress={handleSendNFT}>
                  <Text style={{ fontFamily: fonts.beVietnamPro.bold, color: '#fff' }}>
                    Chuyển tài liệu
                  </Text>
                </TouchableOpacity>
              </BottomSheetView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </>
      ) : (
        <Text style={[styles.redSubtitle, { justifyContent: 'center' }]}>
          Vui lòng nhập email người nhận để tiếp tục
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
    padding: '4%',
    paddingTop: '25%',
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 5,
    paddingHorizontal: '2%',
    marginRight: '2%',
    fontFamily: fonts.beVietnamPro.regular,
    fontSize: 14,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: fonts.beVietnamPro.bold,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.white[100],
    padding: '4%',
    alignItems: 'center',
  },
  formWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: '3%',
    paddingHorizontal: '4%',
    width: '100%',
    elevation: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transferButton: {
    backgroundColor: colors.primary[500],
    padding: '4%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    height: 45,
    paddingHorizontal: '2%',
    borderRadius: 5,
  },
  searchButtonText: {
    marginLeft: '3%',
    color: colors.white[50],
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 14,
  },
  searchingText: {
    marginLeft: '2%',
    color: colors.black,
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 14,
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  suggestionItem: {
    padding: '2%',
    backgroundColor: colors.white[100],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  suggestionText: {
    fontFamily: fonts.beVietnamPro.regular,
    fontSize: 16,
  },
  sectionContainer: {
    padding: '2%',
    borderRadius: 10,
    borderColor: colors.gray[300],
    backgroundColor: colors.white[50],
    elevation: 3,
  },
  sectionHeader: {
    color: colors.black,
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 16,
  },
  informationContainer: {
    padding: '2%',
    backgroundColor: colors.white[50],
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  redTitle: {
    color: colors.primary[500],
    fontFamily: fonts.beVietnamPro.bold,
    fontSize: 17,
  },
  redSubtitle: {
    color: colors.primary[500],
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 15,
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
