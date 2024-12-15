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
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const data1 = [
  { label: 'Hello', value: '1' },
  { label: 'Hello', value: '2' },
  { label: 'Hello', value: '3' },
  { label: 'Hello', value: '4' },
  { label: 'Hello', value: '5' },
  { label: 'Hello', value: '6' },
  { label: 'Hello', value: '7' },
  { label: 'Hello', value: '8' },
];
const data2 = [
  { label: 'Hi', value: '1' },
  { label: 'Hi', value: '2' },
  { label: 'Hi', value: '3' },
  { label: 'Hi', value: '4' },
  { label: 'Hi', value: '5' },
  { label: 'Hi', value: '6' },
  { label: 'Hi', value: '7' },
  { label: 'Hi', value: '8' },
];

export default function AddSession({ navigation }: { navigation: any }) {
  const [notaryFieldSelection, setNotaryFieldSelection] = useState<string | null>(null);
  const [notaryServiceSelection, setNotaryServiceSelection] = useState<string | null>(null);
  const [notaryFieldList, setNotaryFieldList] = useState<INotarizationField[] | null>(null);
  const [notaryServiceList, setNotaryServiceList] = useState<INotarizationService[] | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [user, setUser] = useState<object[] | null>(null);

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

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
        const response =
          await NotarizationServiceService.getNotarizationServicesByFieldId(notaryFieldSelection);
        setNotaryServiceList(response);
        console.log(response);
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
            />
          </View>
          <View>
            <CustomDropdown
              data={notaryFieldList || []}
              value={notaryFieldSelection}
              setValue={setNotaryFieldSelection}
              title="Lĩnh vực công chứng"
              placeholder="Chọn lĩnh vực công chứng"
            />
            <CustomDropdown
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
              <TextInput style={{ width: '80%' }} placeholder="contact@gmail.com" />
              <TouchableOpacity style={styles.addEmailButton}>
                <Text>Thêm</Text>
              </TouchableOpacity>
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
            }}>
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
        style={{ width: '80%' }}
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

const CustomDropdown = ({
  data,
  value,
  setValue,
  title,
  placeholder,
}: {
  data: (INotarizationField | INotarizationService)[];
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
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
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.id);
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
    padding: 8,
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
});
