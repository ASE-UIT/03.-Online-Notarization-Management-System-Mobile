import { INotarizationField } from '@modules/notarizationField';
import { INotarizationService } from '@modules/notarizationService';
import { colors, fonts } from '@theme';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

function CustomDropdown<T extends INotarizationField | INotarizationService>({
  data,
  value,
  setValue,
  title,
  placeholder,
}: {
  data: T[];
  value: T | null;
  setValue?: React.Dispatch<React.SetStateAction<T | null>>;
  title?: string;
  placeholder?: string;
}) {
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
        labelField="name"
        valueField="id"
        placeholder={placeholder || 'Chọn...'}
        searchPlaceholder="Tìm kiếm..."
        value={value?.id}
        onChange={item => {
          if (setValue) {
            setValue(item);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default CustomDropdown;
