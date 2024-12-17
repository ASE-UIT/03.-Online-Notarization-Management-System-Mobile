import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '@theme';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import NotarizationFieldService from '@modules/notarizationField/notarizationField.service';
import { INotarizationField } from '@modules/notarizationField';
import { INotarizationService } from '@modules/notarizationService';
import NotarizationServiceService from '@modules/notarizationService/notarizationService.service';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import SessionService from '@modules/session/session.service';
import { ICreateSessionRequest } from '@modules/session/session.typeDefs';
import { IUser } from '@modules/user';
import UserService from '@modules/user/user.service';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { COLORS } from 'src/constants';
import { CustomDropdown } from '@components/CustomDropdown';
import { DateTimeWrapper } from '@components/DateTimeWrapper';
interface User {
  email: string;
}

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

export default function AddSession({ navigation }: { navigation: any }) {
  const [notaryFieldSelection, setNotaryFieldSelection] = useState<INotarizationField | null>(null);
  const [notaryServiceSelection, setNotaryServiceSelection] = useState<INotarizationService | null>(
    null,
  );
  const [notaryFieldList, setNotaryFieldList] = useState<INotarizationField[] | null>(null);
  const [notaryServiceList, setNotaryServiceList] = useState<INotarizationService[] | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [sessionName, setSessionName] = useState<string>('');
  const [userList, setUserList] = useState<IUser[]>([]);

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [selected, setSelected] = useState<User[]>([]);
  const debounceUserEmail = useDebounce(userEmail, 500);

  const handleCreateSession = async () => {
    if (
      !notaryFieldSelection ||
      !notaryServiceSelection ||
      !startTime ||
      !startDate ||
      !endTime ||
      !endDate ||
      !amount ||
      !userList
    ) {
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
        text2: 'Vui lòng điền đầy đủ thông tin',
      });
      return;
    }
    const input: ICreateSessionRequest = {
      sessionName,
      notaryField: notaryFieldSelection,
      notaryService: notaryServiceSelection,
      startTime: startTime
        ? startTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
        : '',
      startDate: startDate,
      endTime: endTime
        ? endTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
        : '',
      endDate: endDate,
      amount: amount,
      users: selected,
    };

    const response = await SessionService.createSession(input);
    if (response) {
      Toast.show({ type: 'success', text1: 'Tạo phiên công chứng thành công' });
      navigation.navigate('SessionStack');
      console.log(response);
    }
  };

  useEffect(() => {
    const fetchUserList = async () => {
      if (debounceUserEmail !== '') {
        const response = await UserService.searchUserByEmail(debounceUserEmail);
        setUserList(response);
        console.log(response);
      } else {
        setUserList([]);
      }
    };
    fetchUserList();
  }, [debounceUserEmail]);

  useEffect(() => {
    const fetchNotarizationField = async () => {
      const response = await NotarizationFieldService.getAllNotarizationField();
      setNotaryFieldList(response);
    };
    fetchNotarizationField();
  }, []);

  useEffect(() => {
    const fetchNotarizationService = async () => {
      if (notaryFieldSelection) {
        console.log(notaryFieldSelection.id);
        const response = await NotarizationServiceService.getNotarizationServicesByFieldId(
          notaryFieldSelection.id,
        );
        setNotaryServiceList(response);
      }
    };
    fetchNotarizationService();
  }, [notaryFieldSelection]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={styles.formWrapper}>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.textTitle}>Tên phiên công chứng</Text>
            <TextInput
              style={styles.input}
              placeholder="Vd: Phiên giao dịch hợp đồng mua bán nhà đất..."
              value={sessionName}
              onChangeText={setSessionName}
            />
          </View>
          <View>
            <CustomDropdown<INotarizationField>
              data={notaryFieldList || []}
              value={notaryFieldSelection}
              setValue={setNotaryFieldSelection}
              title="Lĩnh vực công chứng"
              placeholder="Chọn lĩnh vực công chứng"
            />
            <CustomDropdown<INotarizationService>
              data={notaryServiceList || []}
              value={notaryServiceSelection}
              setValue={setNotaryServiceSelection}
              title="Dịch vụ công chứng"
              placeholder="Chọn dịch vụ công chứng"
            />
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.textTitle}>Thêm khách mời</Text>
            <View style={styles.emailWrapper}>
              <TextInput
                style={{ width: '80%', fontFamily: fonts.beVietnamPro.regular }}
                placeholder="Nhập email"
                value={userEmail}
                onChangeText={setUserEmail}
              />
              <TouchableOpacity
                style={styles.addEmailButton}
                onPress={() => {
                  setSelected([...selected, { email: userEmail }]);
                  setUserEmail('');
                }}>
                <Text style={{ fontFamily: fonts.beVietnamPro.bold }}>Thêm</Text>
              </TouchableOpacity>
            </View>
            {userList.length > 0 && (
              <ScrollView
                style={{
                  maxHeight: 100,
                  marginTop: 8,
                  backgroundColor: colors.gray[50],
                  borderRadius: 8,
                }}
                nestedScrollEnabled={true}>
                {userList.map(user => {
                  if (!selected.some(selectedUser => selectedUser.email === user.email)) {
                    return (
                      <TouchableOpacity
                        style={{ padding: 8 }}
                        key={user.email}
                        onPress={() => {
                          setUserEmail(user.email);
                        }}>
                        <Text style={{ fontFamily: fonts.beVietnamPro.semiBold, fontSize: 18 }}>
                          {user.email}
                        </Text>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        key={user.email}
                        style={{ backgroundColor: 'red', padding: 8 }}
                        onPress={() => {
                          setSelected(
                            selected.filter(selectedUser => selectedUser.email !== user.email),
                          );
                        }}>
                        <Text style={{ fontFamily: fonts.beVietnamPro.semiBold, fontSize: 18 }}>
                          {user.email}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                })}
              </ScrollView>
            )}
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              {(selected ?? []).map((user, index) =>
                index < 6 ? (
                  <View>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        backgroundColor: Object.values(COLORS)[index],
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 4,
                        borderWidth: 1,
                      }}
                      key={index}>
                      <Text style={{ fontFamily: fonts.beVietnamPro.bold, color: '#fff' }}>
                        {user.email.charAt(0)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        zIndex: 999,
                        backgroundColor: 'white',
                        borderRadius: 50,
                      }}
                      onPress={() => {
                        setSelected(
                          selected.filter(selectedUser => selectedUser.email !== user.email),
                        );
                      }}>
                      <AntDesign name="closecircle" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                ) : index === 6 ? (
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      backgroundColor: colors.gray[100],
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 4,
                      borderWidth: 1,
                    }}
                    key={index}>
                    <Text style={{ fontFamily: fonts.beVietnamPro.bold, color: '#fff' }}>
                      +{(selected?.length ?? 0) - 6}
                    </Text>
                  </View>
                ) : null,
              )}
            </View>
          </View>
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.textTitle}>Thời gian bắt đầu</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <DateTimeWrapper
                icon="clockcircleo"
                DateTimeValue={startTime}
                type="time"
                onPress={setShowStartTimePicker}
                showDateTimePicker={showStartTimePicker}
                setDateTimeValue={setStartTime}
                margin={12}
              />
              <DateTimeWrapper
                icon="calendar"
                DateTimeValue={startDate}
                type="date"
                onPress={setShowStartDatePicker}
                showDateTimePicker={showStartDatePicker}
                setDateTimeValue={setStartDate}
              />
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.textTitle}>Thời gian kết thúc</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <DateTimeWrapper
                icon="clockcircleo"
                DateTimeValue={endTime}
                type="time"
                margin={12}
                onPress={setShowEndTimePicker}
                showDateTimePicker={showEndTimePicker}
                setDateTimeValue={setEndTime}
              />
              <DateTimeWrapper
                icon="calendar"
                DateTimeValue={endDate}
                type="date"
                onPress={setShowEndDatePicker}
                showDateTimePicker={showEndDatePicker}
                setDateTimeValue={setEndDate}
              />
            </View>
          </View>
          <View>
            <Text style={styles.textTitle}>Nhập số lượng</Text>
            <TextInput
              style={styles.input}
              placeholder="Vd: 1, 10, 100 ..."
              value={amount?.toString()}
              onChangeText={text => setAmount(parseInt(text))}
            />
          </View>
        </View>
        <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'flex-end' }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.red[200],
              padding: 12,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 20,
              marginRight: 20,
            }}>
            <Text
              style={{ color: colors.red[500], fontFamily: fonts.beVietnamPro.bold, fontSize: 16 }}>
              Huỷ bỏ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.green[100],
              padding: 12,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={() => handleCreateSession()}>
            <Text
              style={{
                color: colors.green[800],
                fontFamily: fonts.beVietnamPro.bold,
                fontSize: 16,
              }}>
              Tạo phiên công chứng
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  input: {
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
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
