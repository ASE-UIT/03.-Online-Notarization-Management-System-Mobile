import { colors, fonts } from '@theme';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

function SessionCard({ session }: { session: object }) {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardTop}>
        <View>
          <Text style={{ fontFamily: fonts.beVietnamPro.bold, fontSize: 18 }}>
            Tên phiên công chứng
          </Text>
          <Text
            style={{
              fontFamily: fonts.beVietnamPro.regular,
              fontSize: 14,
              color: colors.gray[300],
            }}>
            tạo bởi Trần Tuệ Tánh
          </Text>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={24} color={colors.gray[300]} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, backgroundColor: colors.gray[300], flex: 1 }} />
      <View style={{ marginTop: 16 }}>
        <View style={styles.textWrapper}>
          <Text style={{ fontFamily: fonts.beVietnamPro.semiBold }}>Lĩnh vực: {'  '}</Text>
          <View style={{ backgroundColor: colors.gray[100], padding: 4, borderRadius: 4 }}>
            <Text style={{ fontFamily: fonts.beVietnamPro.semiBold }}>Vay mượn tài sản</Text>
          </View>
        </View>
        <View style={styles.textWrapper}>
          <Text style={{ fontFamily: fonts.beVietnamPro.semiBold }}>Dịch vụ: {'    '}</Text>
          <View style={{ backgroundColor: colors.gray[100], padding: 4, borderRadius: 4 }}>
            <Text style={{ fontFamily: fonts.beVietnamPro.semiBold }}>Vay mượn tài sản</Text>
          </View>
        </View>
      </View>
      <View>
        <Image
          source={require('@assets/images/imageEx.png')}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
      </View>
      <View>
        <View style={styles.timeWrapper}>
          <Feather name="clock" size={24} color={colors.red[500]} />
          <Text
            style={{
              color: colors.red[500],
              marginLeft: 8,
              fontFamily: fonts.beVietnamPro.semiBold,
            }}>
            Còn 2 ngày
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray[100],
    marginBottom: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginBottom: 16,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeWrapper: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: colors.primary[50],
    alignSelf: 'flex-start',
  },
});

export default SessionCard;
