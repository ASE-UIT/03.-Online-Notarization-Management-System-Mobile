import { AntDesign } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { colors, fonts } from '@theme';
import { TextInput, TouchableOpacity, View } from 'react-native';

function DateTimeWrapper({
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
}) {
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
        style={{ width: '80%', fontFamily: fonts.beVietnamPro.regular }}
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
}

export default DateTimeWrapper;
