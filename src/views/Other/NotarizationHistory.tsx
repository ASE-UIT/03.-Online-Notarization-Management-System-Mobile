import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import notarizationService from '@modules/notarization/notarazation.service';
import { useUserSlice } from '@modules/user';
import { INotarization } from '@modules/notarization/notarization.typeDefs';
import { colors, fonts } from '@theme';
import { Dropdown } from 'react-native-element-dropdown';

const options = [
  { value: 'all', label: 'Tất cả' },
  { value: 'success', label: 'Hoàn tất' },
  { value: 'digitalSignature', label: 'Sẵn sàng ký số' },
  { value: 'reject', label: 'Không hợp lệ' },
  { value: 'process', label: 'Đang xử lý' },
  { value: 'pending', label: 'Chờ xử lý' },
];

export default function NotarizationHistory() {
  const { user } = useUserSlice();
  const [filterSelection, setFilterSelection] = useState<{ value: string; label: string }>({
    value: 'all',
    label: 'Tất cả',
  });
  const [notarizationHistory, setNotarizationHistory] = useState<INotarization[]>([] || null);
  const [filteredNotarizationHistory, setFilteredNotarizationHistory] = useState<INotarization[]>(
    [] || null,
  );
  useEffect(() => {
    const fetchNotarizationHistory = async () => {
      const response = await notarizationService.getHistoryByUserId(user?.id || '');
      setNotarizationHistory(response);
      setFilteredNotarizationHistory(response);
      console.log(response);
    };
    fetchNotarizationHistory();
  }, []);

  const randerBackgroundColor = (status: string) => {
    switch (status) {
      case 'success':
        return colors.green[500];
      case 'digitalSignature':
        return colors.blue[500];
      case 'rejected':
        return colors.primary[50];
      case 'processing':
        return colors.yellow[50];
      case 'pending':
        return colors.yellow[500];
      default:
        return colors.gray[100];
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toàn bộ lịch sử công chứng của bạn sẽ hiển thị ở đây</Text>
      <View style={styles.dropdownWrapper}>
        <Dropdown
          data={options}
          search={false}
          labelField="label"
          valueField="value"
          value={filterSelection}
          onChange={value => setFilterSelection(value)}
          placeholder="Lọc theo..."
          placeholderStyle={{ alignContent: 'center' }}
        />
      </View>
      <FlatList
        data={filteredNotarizationHistory}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                backgroundColor: '#fff',
                elevation: 2,
                padding: 16,
                borderRadius: 8,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontSize: 16, width: 150 }} numberOfLines={2}>
                  {item?.notarizationField.name}
                </Text>
                <View
                  style={{
                    backgroundColor: randerBackgroundColor(item?.status.status),
                    padding: 8,
                    borderRadius: 8,
                    width: 230,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                    }}>
                    {item?._id}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.regular,
  },
  dropdownWrapper: {
    marginTop: 16,
    width: 130,
    alignSelf: 'flex-end',
    backgroundColor: colors.gray[100],
    padding: 8,
    borderRadius: 10,
  },
});
