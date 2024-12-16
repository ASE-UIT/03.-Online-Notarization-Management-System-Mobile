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
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import NotarizationFieldService from '@modules/notarizationField/notarizationField.service';
import { INotarizationField } from '@modules/notarizationField';
import { INotarizationService } from '@modules/notarizationService';
import NotarizationServiceService from '@modules/notarizationService/notarizationService.service';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { validateEmail } from '@utils/validation';
import Toast from 'react-native-toast-message';
import { COLORS } from 'src/constants';
import SessionService from '@modules/session/session.service';
import { ICreateSessionRequest } from '@modules/session/session.typeDefs';
import { SelectList } from 'react-native-dropdown-select-list';
import { IUser } from '@modules/user';
import UserService from '@modules/user/user.service';
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
  const [users, setUsers] = useState<User[] | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [sessionName, setSessionName] = useState<string>('');
  const [userList, setUserList] = useState<IUser[]>([]);

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [selected, setSelected] = useState<IUser[]>([]);
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
      users: selected.map(user => ({ email: user.email })),
    };

    const response = await SessionService.createSession(input);
    if (response) {
      Toast.show({ type: 'success', text1: 'Tạo phiên công chứng thành công' });
      navigation.goBack();
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

  const renderItem = (item: IUser) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.email}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
    );
  };

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
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={userList}
              labelField="email"
              valueField="id"
              placeholder="Chọn người dùng muốn thêm"
              value={selected.map(item => item.id)}
              search
              searchPlaceholder="Tìm kiếm người dùng..."
              onChange={item => {
                const selectedUsers = item.map((id: string) =>
                  userList.find(user => user.id === id),
                );
                setSelected(selectedUsers.filter(user => user) as IUser[]);
              }}
              onChangeText={setUserEmail}
              renderItem={renderItem}
              renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={styles.selectedStyle}>
                    <Text style={styles.textSelectedStyle}>
                      {item.email.length > 15 ? item.email.slice(0, 15) + '...' : item.email}
                    </Text>
                    <AntDesign color="black" name="delete" size={17} />
                  </View>
                </TouchableOpacity>
              )}
            />
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

const DateTimeWrapper = ({
  icon,
  margin,
  showDateTimePicker = false,
  onPress,
  setDateTimeValue,
  DateTimeValue,
  type,
}: {
  icon: keyof typeof AntDesign.glyphMap;
  margin?: number;
  showDateTimePicker?: boolean;
  onPress?: React.Dispatch<React.SetStateAction<boolean>>;
  setDateTimeValue?: React.Dispatch<React.SetStateAction<Date | null>>;
  DateTimeValue: Date | null;
  type?: 'date' | 'time';
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.gray[50],
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: margin,
      }}>
      <TextInput
        style={{ width: '80%', fontFamily: fonts.beVietnamPro.regular }}
        value={
          type == 'date'
            ? DateTimeValue?.toLocaleDateString('en-GB')
            : DateTimeValue?.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
        }
      />
      <TouchableOpacity onPress={() => onPress?.(true)}>
        <AntDesign name={icon} size={24} color="black" />
      </TouchableOpacity>
      {showDateTimePicker && (
        <RNDateTimePicker
          mode={type}
          value={new Date()}
          onChange={(event, date) => {
            const currentDate = date || DateTimeValue;
            onPress?.(false);
            setDateTimeValue?.(currentDate);
          }}
        />
      )}
    </View>
  );
};

const CustomDropdown = <T extends INotarizationField | INotarizationService>({
  data,
  value,
  setValue,
  title,
  placeholder,
}: {
  data: T[];
  value: T | null;
  setValue: React.Dispatch<React.SetStateAction<T | null>>;
  title?: string;
  placeholder?: string;
}) => {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.textTitle}>{title}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder={placeholder || 'Chọn...'}
        searchPlaceholder="Tìm kiếm..."
        value={value?.id}
        onChange={item => {
          setValue(item);
        }}
      />
    </View>
  );
};

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
  dropdown: {
    height: 50,
    backgroundColor: colors.gray[50],
    borderRadius: 8,
    paddingHorizontal: 12,
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
  placeholderStyle: {
    fontSize: 14,
    color: colors.gray[200],
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.bold,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  emailWrapper: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors.gray[50],
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
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
