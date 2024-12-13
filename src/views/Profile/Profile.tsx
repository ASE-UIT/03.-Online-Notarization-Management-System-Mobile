import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from 'vn-provinces';

export default function Profile({ navigation }: { navigation: any }) {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState({
    city: false,
    district: false,
    ward: false,
  });

  const [personalInfo, setPersonalInfo] = useState({
    name: 'Nguyễn Quốc Thắng',
    phone: '+84 123456789',
    email: 'Test@gmail.com',
    id: '0123456789',
  });

  const [addressInfo, setAddressInfo] = useState({
    street: '69 Trần Duy Hưng',
    ward: '',
    district: '',
    city: '',
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = getProvinces();
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  const handleCitySelect = (provinceCode: string, provinceName: string) => {
    setDistricts(getDistrictsByProvinceCode(provinceCode));
    setAddressInfo(prev => ({ ...prev, city: provinceName, district: '', ward: '' }));
    setWards([]);
  };

  const handleDistrictSelect = (districtCode: string, districtName: string) => {
    setWards(getWardsByDistrictCode(districtCode));
    setAddressInfo(prev => ({ ...prev, district: districtName, ward: '' }));
  };

  const handleWardSelect = (wardCode: string, wardName: string) => {
    setAddressInfo(prev => ({ ...prev, ward: wardName }));
  };

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
              {/* Tỉnh/Thành phố */}
              <View style={styles.inputWrapperEditingColumnAddress}>
                <Text style={styles.labelEditingAddress}>Tỉnh/thành phố:</Text>
                <View style={styles.inputContainerEditingAddress}>
                  <TextInput
                    style={[styles.inputEditingAddress, { fontWeight: 'bold', color: '#000' }]} // fontWeight để tô đậm
                    value={addressInfo.city}
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={() => setIsDropdownVisible(prev => ({ ...prev, city: !prev.city }))}>
                    <Entypo name="chevron-down" size={16} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              {isDropdownVisible.city && (
                <View style={styles.dropdownContainer}>
                  <ScrollView style={styles.dropdownList}>
                    {provinces.map(province => (
                      <TouchableOpacity
                        key={province.code}
                        onPress={() => {
                          handleCitySelect(province.code, province.name);
                          setIsDropdownVisible(prev => ({ ...prev, city: false }));
                        }}>
                        <Text style={styles.dropdownItem}>{province.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Quận/Huyện */}
              <View style={styles.inputWrapperEditingColumnAddress}>
                <Text style={styles.labelEditingAddress}>Quận/huyện:</Text>
                <View style={styles.inputContainerEditingAddress}>
                  <TextInput
                    style={[styles.inputEditingAddress, { fontWeight: 'bold', color: '#000' }]} // fontWeight để tô đậm
                    value={addressInfo.district}
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setIsDropdownVisible(prev => ({ ...prev, district: !prev.district }))
                    }>
                    <Entypo name="chevron-down" size={16} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              {isDropdownVisible.district && (
                <View style={styles.dropdownContainer}>
                  <ScrollView style={styles.dropdownList}>
                    {districts.map(district => (
                      <TouchableOpacity
                        key={district.code}
                        onPress={() => {
                          handleDistrictSelect(district.code, district.name);
                          setIsDropdownVisible(prev => ({ ...prev, district: false }));
                        }}>
                        <Text style={styles.dropdownItem}>{district.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Xã/Phường */}
              <View style={styles.inputWrapperEditingColumnAddress}>
                <Text style={styles.labelEditingAddress}>Xã phường/thị trấn:</Text>
                <View style={styles.inputContainerEditingAddress}>
                  <TextInput
                    style={[styles.inputEditingAddress, { fontWeight: 'bold', color: '#000' }]} // fontWeight để tô đậm
                    value={addressInfo.ward}
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={() => setIsDropdownVisible(prev => ({ ...prev, ward: !prev.ward }))}>
                    <Entypo name="chevron-down" size={16} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              {isDropdownVisible.ward && (
                <View style={styles.dropdownContainer}>
                  <ScrollView style={styles.dropdownList}>
                    {wards.map(ward => (
                      <TouchableOpacity
                        key={ward.code}
                        onPress={() => {
                          handleWardSelect(ward.code, ward.name);
                          setIsDropdownVisible(prev => ({ ...prev, ward: false }));
                        }}>
                        <Text style={styles.dropdownItem}>{ward.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
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
            </View>
          ) : (
            <View>
              <Text style={styles.text}>
                Tỉnh/thành phố: <Text style={styles.bold}>{addressInfo.city}</Text>
              </Text>
              <Text style={styles.text}>
                Quận/huyện: <Text style={styles.bold}>{addressInfo.district}</Text>
              </Text>
              <Text style={styles.text}>
                Xã phường/thị trấn: <Text style={styles.bold}>{addressInfo.ward}</Text>
              </Text>
              <Text style={styles.text}>
                Số nhà/đường phố: <Text style={styles.bold}>{addressInfo.street}</Text>
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
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    zIndex: 1,
    maxHeight: 250,
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
    marginBottom: 15,
  },
  labelEditing: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  inputEditing: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  inputBold: {
    fontWeight: 'bold',
  },
  inputWrapperEditingColumnAddress: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelEditingAddress: {
    fontSize: 14,
    color: 'gray',
    width: 140,
    marginRight: 10,
    textAlign: 'left',
  },
  inputContainerEditingAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flex: 1,
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
