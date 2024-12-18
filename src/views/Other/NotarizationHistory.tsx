import { View, Text, StyleSheet, ScrollView, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import notarizationService from '@modules/notarization/notarazation.service';
import { useUserSlice } from '@modules/user';
import { INotarization } from '@modules/notarization/notarization.typeDefs';
import { colors, fonts } from '@theme';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { NotarizationCard } from '@components/NotarizationCard';

const options = [
  { value: 'all', label: 'Tất cả' },
  { value: 'completed', label: 'Hoàn tất' },
  { value: 'digitalSignature', label: 'Sẵn sàng ký số' },
  { value: 'reject', label: 'Không hợp lệ' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'verification', label: 'Đang xác thực' },
];

export default function NotarizationHistory({ navigation }: { navigation: any }) {
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
    };
    fetchNotarizationHistory();
  }, []);

  const navigateToNotarizationDetail = (item: INotarization) => {
    navigation.navigate('NotarizationDetailStack', { notarization: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toàn bộ lịch sử công chứng của bạn sẽ hiển thị ở đây</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.searchBox}>
          <AntDesign name="search1" size={24} color="black" />
          <TextInput style={{ width: '90%' }} placeholder="Tìm kiếm theo mã công chứng" />
        </View>
        <Dropdown
          style={styles.dropdownWrapper}
          data={options}
          search={false}
          labelField="label"
          valueField="value"
          value={filterSelection}
          onChange={value => {
            setFilterSelection(value);
            setFilteredNotarizationHistory(
              notarizationHistory.filter(item => {
                if (value.value === 'all') {
                  return true;
                }
                return item.status.status === value.value;
              }),
            );
            console.log('filteredNotarizationHistory', filteredNotarizationHistory);
          }}
          placeholder="Lọc theo..."
          selectedTextStyle={{ fontSize: 16 }}
          placeholderStyle={{ alignContent: 'center', fontSize: 14 }}
        />
      </View>
      <FlatList
        style={{ marginTop: 8 }}
        data={filteredNotarizationHistory}
        renderItem={({ item }) => {
          return (
            <NotarizationCard item={item} onPress={() => navigateToNotarizationDetail(item)} />
          );
        }}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ height: 80 }} />
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
    justifyContent: 'center',
    marginTop: 16,
    width: 130,
    backgroundColor: colors.gray[100],
    padding: 8,
    borderRadius: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    padding: 8,
    borderRadius: 10,
    marginTop: 16,
    width: '60%',
  },
});
