import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Profile({ navigation }: { navigation: any }) {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Để điều khiển hiển thị dropdown
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Nguyễn Quốc Thắng',
    phone: '+84 123456789',
    email: 'Test@gmail.com',
    id: '0123456789',
  });
  const [addressInfo, setAddressInfo] = useState({
    street: '69 Trần Duy Hưng',
    ward: 'Đông Hoà',
    district: 'Dĩ An',
    city: 'Bình Dương',
  });

  // Danh sách 63 tỉnh thành
  const provinces = [
    'Hà Nội',
    'Hồ Chí Minh',
    'Bình Dương',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'An Giang',
    'Bà Rịa-Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bến Tre',
    'Bình Định',
    'Bình Phước',
    'Bình Thuận',
    'Cao Bằng',
    'Cà Mau',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Nai',
    'Đồng Tháp',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Tây',
    'Hậu Giang',
    'Hòa Bình',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lâm Đồng',
    'Lạng Sơn',
    'Lào Cai',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Phú Yên',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên-Huế',
    'Tiền Giang',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái',
    'Hòa Bình',
    'Bắc Ninh',
    'Bến Tre',
    'Cà Mau',
    'Bình Định',
    'Lào Cai',
    'Bắc Kạn',
    'Sơn La',
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Tài khoản của tôi</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Personal Info */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>THÔNG TIN CÁ NHÂN</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditingPersonal(!isEditingPersonal)}>
              <Entypo name="edit" size={16} color="black" />
              <Text style={styles.editText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          {isEditingPersonal ? (
            <View>
              <View style={styles.inputWrapperEditingColumn}>
                <Text style={styles.labelEditing}>Họ và tên:</Text>
                <View style={styles.inputContainerEditing}>
                  <TextInput
                    style={[styles.inputEditing, styles.inputBold]}
                    value={personalInfo.name}
                    onChangeText={text => setPersonalInfo(prev => ({ ...prev, name: text }))}
                  />
                  <TouchableOpacity
                    style={styles.iconBackground}
                    onPress={() => setPersonalInfo(prev => ({ ...prev, name: '' }))}>
                    <Entypo name="cross" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputWrapperEditingColumn}>
                <Text style={styles.labelEditing}>Số điện thoại:</Text>
                <View style={styles.inputContainerEditing}>
                  <TextInput
                    style={[styles.inputEditing, styles.inputBold]}
                    value={personalInfo.phone}
                    onChangeText={text => setPersonalInfo(prev => ({ ...prev, phone: text }))}
                  />
                  <TouchableOpacity
                    style={styles.iconBackground}
                    onPress={() => setPersonalInfo(prev => ({ ...prev, phone: '' }))}>
                    <Entypo name="cross" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.text]}>
                Email: <Text style={styles.bold}>{personalInfo.email}</Text>
              </Text>
              <Text style={[styles.text]}>
                CCCD/CMND: <Text style={styles.bold}>{personalInfo.id}</Text>
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.text}>
                Họ và tên: <Text style={styles.bold}>{personalInfo.name}</Text>
              </Text>
              <Text style={styles.text}>
                Email: <Text style={styles.bold}>{personalInfo.email}</Text>
              </Text>
              <Text style={styles.text}>
                Số điện thoại: <Text style={styles.bold}>{personalInfo.phone}</Text>
              </Text>
              <Text style={styles.text}>
                CCCD/CMND: <Text style={styles.bold}>{personalInfo.id}</Text>
              </Text>
            </View>
          )}
        </View>

        {/* Address Info */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>ĐỊA CHỈ LIÊN HỆ</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditingAddress(!isEditingAddress)}>
              <Entypo name="edit" size={16} color="black" />
              <Text style={styles.editText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          {isEditingAddress ? (
            <View>
              <View style={styles.inputWrapperEditingColumnAddress}>
                <Text style={styles.labelEditingAddress}>Số nhà/đường phố:</Text>
                <View style={styles.inputContainerEditingAddress}>
                  <TextInput
                    style={[styles.inputEditingAddress, styles.inputBoldAddress]}
                    value={addressInfo.street}
                    onChangeText={text => setAddressInfo(prev => ({ ...prev, street: text }))}
                  />
                  <TouchableOpacity
                    style={styles.iconBackground}
                    onPress={() => setAddressInfo(prev => ({ ...prev, street: '' }))}>
                    <Entypo name="cross" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputWrapperEditingColumnAddress}>
                <Text style={styles.labelEditingAddress}>Xã phường/thị trấn:</Text>
                <View style={styles.inputContainerEditingAddress}>
                  <TextInput
                    style={[styles.inputEditingAddress, styles.inputBoldAddress]}
                    value={addressInfo.ward}
                    onChangeText={text => setAddressInfo(prev => ({ ...prev, ward: text }))}
                  />
                  <TouchableOpacity onPress={() => setAddressInfo(prev => ({ ...prev, ward: '' }))}>
                    <Entypo name="chevron-down" size={16} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputWrapperEditingColumnAddress}>
                <Text style={styles.labelEditingAddress}>Quận/huyện:</Text>
                <View style={styles.inputContainerEditingAddress}>
                  <TextInput
                    style={[styles.inputEditingAddress, styles.inputBoldAddress]}
                    value={addressInfo.district}
                    onChangeText={text => setAddressInfo(prev => ({ ...prev, district: text }))}
                  />
                  <TouchableOpacity
                    onPress={() => setAddressInfo(prev => ({ ...prev, district: '' }))}>
                    <Entypo name="chevron-down" size={16} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputWrapperEditingColumnAddress}>
                <Text style={styles.labelEditingAddress}>Tỉnh/thành phố:</Text>
                <View style={styles.inputContainerEditingAddress}>
                  <TextInput
                    style={[styles.inputEditingAddress, styles.inputBoldAddress]}
                    value={addressInfo.city}
                    onChangeText={text => setAddressInfo(prev => ({ ...prev, city: text }))}
                  />
                  <TouchableOpacity onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
                    <Entypo name="chevron-down" size={16} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              {isDropdownVisible && (
                <View style={styles.dropdownContainer}>
                  <ScrollView style={styles.dropdownList}>
                    {provinces.map((province, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setAddressInfo(prev => ({ ...prev, city: province }));
                          setIsDropdownVisible(false);
                        }}>
                        <Text style={styles.dropdownItem}>{province}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          ) : (
            <View>
              <Text style={styles.text}>
                Số nhà/đường phố: <Text style={styles.bold}>{addressInfo.street}</Text>
              </Text>
              <Text style={styles.text}>
                Xã phường/thị trấn: <Text style={styles.bold}>{addressInfo.ward}</Text>
              </Text>
              <Text style={styles.text}>
                Quận/huyện: <Text style={styles.bold}>{addressInfo.district}</Text>
              </Text>
              <Text style={styles.text}>
                Tỉnh/thành phố: <Text style={styles.bold}>{addressInfo.city}</Text>
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 40, // Điều chỉnh vị trí của dropdown so với input
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    zIndex: 1,
    maxHeight: 250, // Đặt chiều cao tối đa cho dropdown
  },
  dropdownList: {
    padding: 10,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownItem: {
    padding: 10,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    padding: 15,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'black',
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  inputWrapperEditingColumn: {
    marginBottom: 15, // Khoảng cách dưới mỗi input
    borderWidth: 1, // Thêm viền với độ dày là 1
    borderColor: 'black', // Màu viền là đen
    borderRadius: 5, // Tạo góc bo tròn cho viền nếu cần
    padding: 2, // Khoảng cách giữa viền và các phần tử bên trong
  },
  labelEditing: {
    fontSize: 14,
    color: 'gray',
    marginBottom: -15,
  },
  inputContainerEditing: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  inputEditing: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
  },
  inputBold: {
    fontWeight: 'bold',
  },
  iconBackground: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#9EA2AE',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  inputWrapperEditingColumnAddress: {
    marginBottom: 15,
    flexDirection: 'row', // Đảm bảo các phần tử nằm trên cùng một dòng
    alignItems: 'center', // Căn giữa các phần tử theo chiều dọc
    justifyContent: 'space-between', // Đảm bảo khoảng cách hợp lý giữa nhãn và trường nhập liệu
  },
  labelEditingAddress: {
    fontSize: 14,
    color: 'gray',
    width: 140, // Chiều rộng cố định cho nhãn (có thể điều chỉnh tùy theo nội dung)
    marginRight: 10, // Khoảng cách giữa nhãn và input
    textAlign: 'left', // Đảm bảo văn bản trong nhãn căn trái
  },
  inputContainerEditingAddress: {
    flexDirection: 'row', // Hiển thị theo chiều ngang
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flex: 1, // Đảm bảo input chiếm hết không gian còn lại
  },
  inputEditingAddress: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
  },
  inputBoldAddress: {
    fontWeight: 'bold',
  },
});
