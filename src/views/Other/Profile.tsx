import { fonts } from '@theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IAddress, useUserSlice } from '@modules/user';
import { useEffect, useState } from 'react';
import UserService from '@modules/user/user.service';
import { Dropdown } from 'react-native-element-dropdown';
import {
  IDistricts,
  IProvinces,
  IWards,
  getDistrictByCode,
  getDistrictsByProvinceCode,
  getProvinces,
  getWardsByDistrictCode,
} from 'vn-provinces';

export default function Profile() {
  const { user, dispatch, setUser } = useUserSlice();
  const [isEditUser, setIsEditUser] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [citizenId, setCitizenId] = useState(user?.citizenId || '');
  const [provinceList, setProvinceList] = useState<IProvinces[]>([]);
  const [districtList, setDistrictList] = useState<IDistricts[]>([]);
  const [wardList, setWardList] = useState<IWards[]>([]);

  const [province, setProvince] = useState(user?.address.province || '');
  const [district, setDistrict] = useState(user?.address.district || '');
  const [ward, setWard] = useState(user?.address.town || '');
  const [street, setStreet] = useState(user?.address.street || '');

  const onSaveUser = async () => {
    const data = {
      name,
      email,
      phoneNumber,
      citizenId,
    };
    const newUser = {
      ...user,
      ...data,
    };
    dispatch(setUser(newUser));
    setIsEditUser(false);
    if (user?.id) {
      const response = await UserService.updateUser(data, user.id);
    } else {
      // Handle the case where user.id is undefined
      console.error('User ID is undefined');
    }
  };
  const onSaveUserAddress = async () => {
    const data: IAddress = {
      province,
      district,
      town: ward,
      street,
    };
    console.log(data);
    const newUser = {
      ...user,
      address: data,
    };
    dispatch(setUser(newUser));
    setIsEditAddress(false);
    if (user?.id) {
      const response = await UserService.updateUser(newUser, user.id);
    } else {
      // Handle the case where user.id is undefined
      console.error('User ID is undefined');
    }
  };
  useEffect(() => {
    const fetchProvinces = async () => {
      const provinces = getProvinces();
      setProvinceList(provinces);
    };
    fetchProvinces();
  }, []);
  const fetchDistricts = async (provinceCode: string) => {
    const districts = getDistrictsByProvinceCode(provinceCode);
    setDistrictList(districts);
  };
  const fetchWard = async (districtCode: string) => {
    const wards = getWardsByDistrictCode(districtCode);
    setWardList(wards);
  };
  return (
    <View style={styles.container}>
      {!isEditUser ? (
        <View style={styles.userInforWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>Thông tin cá nhân</Text>
            <TouchableOpacity onPress={() => setIsEditUser(true)}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.userText}>Họ và tên: {name}</Text>
            <Text style={styles.userText}>Email:{email}</Text>
            <Text style={styles.userText}>Số điện thoại: {phoneNumber}</Text>
            <Text style={styles.userText}>CCCD/CMND: {citizenId}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.userInforWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>Thông tin cá nhân</Text>
            <TouchableOpacity onPress={() => onSaveUser()}>
              <Text>Lưu</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.changeTextWrapper}>
            <Text style={styles.userText}>Họ và tên:</Text>
            <TextInput value={name} onChangeText={setName} style={styles.textInputWrapper} />
          </View>
          <View style={styles.changeTextWrapper}>
            <Text style={styles.userText}>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.textInputWrapper} />
          </View>
          <View style={styles.changeTextWrapper}>
            <Text style={styles.userText}>Số điện thoại:</Text>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.textInputWrapper}
            />
          </View>
          <View style={styles.changeTextWrapper}>
            <Text style={styles.userText}>CCCD/CMND:</Text>
            <TextInput
              value={citizenId}
              onChangeText={setCitizenId}
              style={styles.textInputWrapper}
            />
          </View>
        </View>
      )}

      {!isEditAddress ? (
        <View style={styles.userInforWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>Địa chỉ</Text>
            <TouchableOpacity onPress={() => setIsEditAddress(true)}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.userText}>Tỉnh/Thành phố: {user?.address.province}</Text>
            <Text style={styles.userText}>Quận/Huyện: {user?.address.district}</Text>
            <Text style={styles.userText}>Phường/Xã: {user?.address.town}</Text>
            <Text style={styles.userText}>Đường: {user?.address.street}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.userInforWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>Địa chỉ</Text>
            <TouchableOpacity onPress={() => onSaveUserAddress()}>
              <Text>Lưu</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.changeTextWrapper}>
            <Text style={styles.userText}>Tỉnh/Thành phố:</Text>
            <Dropdown
              data={provinceList}
              valueField="code"
              labelField="name"
              onChange={item => {
                setProvince(item.name);
                fetchDistricts(item.code);
              }}
              style={styles.dropdownContainer}
              placeholder="Chọn tỉnh/thành phố"
            />
          </View>
          <View style={styles.changeTextWrapper}>
            <Text style={styles.userText}>Huyện/quận:</Text>
            <Dropdown
              data={districtList}
              valueField="code"
              labelField="name"
              onChange={item => {
                setDistrict(item.name);
                fetchWard(item.code);
              }}
              style={styles.dropdownContainer}
              placeholder="Chọn huyện/quận"
            />
          </View>
          <View style={styles.changeTextWrapper}>
            <Text style={styles.userText}>Huyện/quận:</Text>
            <Dropdown
              data={wardList}
              valueField="code"
              labelField="name"
              onChange={item => {
                setWard(item.name);
              }}
              style={styles.dropdownContainer}
              placeholder="Chọn huyện/quận"
            />
          </View>
          <View style={styles.changeTextWrapper}>
            <Text style={styles.userText}>Tên đường:</Text>
            <TextInput value={street} onChangeText={setStreet} style={styles.textInputWrapper} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInforWrapper: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 5,
    margin: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.bold,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userText: {
    fontSize: 14,
    fontFamily: fonts.beVietnamPro.semiBold,
    marginBottom: 8,
  },
  textInputWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    maxWidth: 250,
    fontFamily: fonts.beVietnamPro.regular,
  },
  changeTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dropdownContainer: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    maxWidth: 250,
    fontFamily: fonts.beVietnamPro.regular,
  },
});
