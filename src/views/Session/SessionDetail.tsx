import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '@theme';
import { ISession } from '@modules/session/session.typeDefs';
import { formatDate } from '@utils/helper';
import { useUserSlice } from '@modules/user';
import UserService from '@modules/user/user.service';
import { DocumentStatusCode, getDocumentStatusByCode } from '@utils/constants';
import Toast from 'react-native-toast-message';
import SessionService from '@modules/session/session.service';
import { Feather } from '@expo/vector-icons';

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

export default function SessionDetail({
  navigation,
  route,
}: Readonly<{ navigation: any; route: any }>) {
  const { session } = route.params as { session: ISession };
  const [userEmailList, setUserEmailList] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isManualSelection, setIsManualSelection] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 150);

  const { user } = useUserSlice();

  const renderUserEmail = () => {
    if (!session || !Array.isArray(session.users) || session.users.length === 0) {
      return <Text style={styles.info}>Không có người nào được mời.</Text>;
    }
    return (
      <View>
        {userEmailList.map((email, index) => (
          <View key={email} style={styles.fileRow}>
            <Text style={styles.email}>{`• ${email}`}</Text>
            {user?.id === session?.creator._id ||
              (session?.status.status === 'unknown' && (
                <Pressable onPress={() => handleDeleteUser(email)}>
                  <Feather name="x-circle" size={24} color={colors.gray[600]} />
                </Pressable>
              ))}
          </View>
        ))}
      </View>
    );
  };

  const fetchUserEmailList = async () => {
    try {
      const emails = session.users.map(user => user.email);
      setUserEmailList(emails);
    } catch (error) {
      console.error('Error fetching user email list:', error);
    }
  };

  useEffect(() => {
    fetchUserEmailList();
  }, []);

  const handleSearchInput = (text: string) => {
    setSearchQuery(text);
    setIsManualSelection(false);
  };

  const handleSelectUser = (user: any) => {
    setIsManualSelection(true);
    setSearchQuery(user.email);
    setSuggestions([]);
  };

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

  const handleDeleteUser = async (email: string) => {
    try {
      console.log(email);
      await SessionService.deleteUserFromSession(session._id, email);
      setUserEmailList(userEmailList.filter(userEmail => userEmail !== email));
    } catch {
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

  const handleAddUser = async () => {
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
        await SessionService.addUserToSession(session._id, [userToConfirm.email]);
        userEmailList.push(userToConfirm.email);
        setSuggestions([]);
        setSearchQuery('');
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Thông tin phiên công chứng</Text>
          <View style={styles.informationContainer}>
            <Text style={styles.title}>Tên phiên công chứng:</Text>
            <Text style={styles.info}>{session?.sessionName}</Text>
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.title}>Trạng thái:</Text>
            <Text style={styles.info}>
              {getDocumentStatusByCode(session?.status.status as DocumentStatusCode)}
            </Text>
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.title}>Người tạo phiên:</Text>
            <Text style={styles.info}>{session?.creator.name}</Text>
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.title}>Lĩnh vực công chứng:</Text>
            <Text style={styles.info}>{session?.notaryField.name}</Text>
          </View>

          <View style={styles.informationContainer}>
            <Text style={styles.title}>Thời gian bắt đầu:</Text>
            <Text style={styles.info}>
              {session?.startTime?.toLocaleString()} {formatDate(session?.startDate)}
            </Text>
          </View>

          <View style={styles.informationContainer}>
            <Text style={styles.title}>Thời gian kết thúc:</Text>
            <Text style={styles.info}>
              {session?.endTime?.toLocaleString()} {formatDate(session?.endDate)}
            </Text>
          </View>

          <View style={styles.informationContainer}>
            <Text style={styles.title}>Số lượng bản sao:</Text>
            <Text style={styles.info}>{session?.amount}</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Thông tin khách mời</Text>
          {user?.id === session?.creator._id ||
            (session?.status.status === 'unknown' && (
              <View style={styles.emailWrapper}>
                <TextInput
                  style={{ marginTop: '2%', width: '80%', fontFamily: fonts.beVietnamPro.regular }}
                  placeholder="Nhập email"
                  value={searchQuery}
                  onChangeText={handleSearchInput}
                />
                <TouchableOpacity style={styles.addEmailButton} onPress={handleAddUser}>
                  <Text style={{ fontFamily: fonts.beVietnamPro.bold }}>Thêm</Text>
                </TouchableOpacity>
              </View>
            ))}
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
          {renderUserEmail()}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Thông tin phiên công chứng</Text>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white[50],
    padding: '3%',
  },
  formWrapper: {
    margin: 4,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textHolder: {
    backgroundColor: colors.gray[50],
    padding: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.bold,
    marginBottom: 5,
  },
  textValue: {
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.semiBold,
  },
  emailWrapper: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors.gray[50],
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    paddingRight: 24,
    marginTop: '3%',
  },
  addEmailButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    padding: 8,
    paddingHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: '2%',
    paddingBottom: '5%',
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
    fontSize: 16,
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
  email: {
    color: colors.black,
    fontFamily: fonts.beVietnamPro.semiBold,
    fontSize: 14,
    flex: 1,
    marginVertical: '2%',
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
  fileRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '3%',
  },
});
