import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { colors, fonts } from '@theme';
import { ISession } from '@modules/session/session.typeDefs';
import { CustomDropdown } from '@components/CustomDropdown';
import { INotarizationField } from '@modules/notarizationField';
import { INotarizationService } from '@modules/notarizationService';
import { DateTimeWrapper } from '@components/DateTimeWrapper';
import { formatDate } from '@utils/helper';

export default function SessionDetail({ navigation, route }: { navigation: any; route: any }) {
  const [session, setSession] = useState<ISession | null>(route.params.session);
  const [userEmail, setUserEmail] = useState('');
  const [selected, setSelected] = useState<{ email: string }[]>([]);
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={styles.formWrapper}>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.textTitle}>Tên phiên công chứng</Text>
            <View style={styles.textHolder}>
              <Text style={styles.textValue}>{session?.sessionName}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.textTitle}>Lĩnh vực công chứng</Text>
            <View style={styles.textHolder}>
              <Text style={styles.textValue}>{session?.notaryField.name}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.textTitle}>Dịch vụ công chứng</Text>
            <View style={styles.textHolder}>
              <Text style={styles.textValue}>{session?.notaryService.name}</Text>
            </View>
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
            {/* {userList.length > 0 && (
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
            )} */}
            {/* <View style={{ flexDirection: 'row', marginTop: 8 }}>
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
            </View> */}
          </View>
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.textTitle}>Thời gian bắt đầu</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={[styles.textHolder, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.textValue}>{session?.startTime?.toLocaleString()}</Text>
              </View>
              <View style={[styles.textHolder, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.textValue}>{formatDate(session?.startDate)}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.textTitle}>Thời gian kết thúc</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={[styles.textHolder, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.textValue}>{session?.endTime?.toLocaleString()}</Text>
              </View>
              <View style={[styles.textHolder, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.textValue}>{formatDate(session?.endDate)}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.textTitle}>Nhập số lượng</Text>
            <View style={[styles.textHolder, { flex: 1 }]}>
              <Text style={styles.textValue}>{session?.amount}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 12, flexDirection: 'row', alignSelf: 'flex-end' }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.green[100],
              padding: 12,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 20,
              paddingHorizontal: 20,
            }}
            // onPress={() => handleCreateSession()}
          >
            <Text
              style={{
                color: colors.green[800],
                fontFamily: fonts.beVietnamPro.bold,
                fontSize: 16,
              }}>
              Lưu
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
  textHolder: {
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
  textValue: {
    fontSize: 16,
    fontFamily: fonts.beVietnamPro.semiBold,
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
});
