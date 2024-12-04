import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

export default function Search() {
  const [searching, setSearching] = useState(false);
  const [fileId, setFileId] = useState('');

  const handleSearch = () => {
    setSearching(true);
    // Giả lập tìm kiếm
    setTimeout(() => {
      setSearching(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tra cứu hồ sơ công chứng</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mã số hồ sơ"
          value={fileId}
          onChangeText={text => setFileId(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Image source={require('./assets/search.png')} style={styles.searchIcon} />
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      {searching && (
        <View style={styles.searchingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.searchingText}>Đang tìm hồ sơ có số: #{fileId || '9999'}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 30,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1, // Thêm viền
    borderColor: '#ddd', // Màu viền
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  searchButtonText: {
    color: '#e91e63',
    fontWeight: 'bold',
  },
  searchingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20, // Tăng padding để tạo khoảng cách cho các thành phần
    borderRadius: 5,
  },
  searchingText: {
    marginLeft: 10,
    color: '#555',
    fontSize: 18, // Tăng kích thước chữ
    fontWeight: 'bold', // Thêm độ đậm cho chữ
  },
});
