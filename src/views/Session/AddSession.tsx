import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { colors, fonts } from '@theme';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

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
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);

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
              data={data1}
              value={value1}
              setValue={setValue1}
              title="Lĩnh vực công chứng"
              placeholder="Chọn lĩnh vực công chứng"
            />
            <CustomDropdown
              data={data2}
              value={value2}
              setValue={setValue2}
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
              <DateTimeWrapper icon="calendar" margin={12} />
              <DateTimeWrapper icon="clockcircleo" />
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.textTitle}>Thời gian kết thúc</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <DateTimeWrapper icon="calendar" margin={12} />
              <DateTimeWrapper icon="clockcircleo" />
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
}: {
  icon: keyof typeof AntDesign.glyphMap;
  margin?: number;
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
      <TextInput style={{ width: '80%' }} />
      <TouchableOpacity>
        <AntDesign name={icon} size={24} color="black" />
      </TouchableOpacity>
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
  data: { label: string; value: string }[];
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
        labelField="label"
        valueField="value"
        placeholder={placeholder || 'Chọn...'}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
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
