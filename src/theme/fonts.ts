import { loadAsync } from 'expo-font';

export const fonts = {
  beVietnamPro: {
    regular: 'beVietnamPro_regular',
    regularItalic: 'beVietnamPro_regular_italic',
    semiBold: 'beVietnamPro_semiBold',
    semiBoldItalic: 'beVietnamPro_semiBold_italic',
    bold: 'beVietnamPro_bold',
    boldItalic: 'beVietnamPro_bold_italic',
  },
};

// preload fonts
export const loadFonts = () =>
  loadAsync({
    beVietnamPro_regular: require('@assets/fonts/BeVietnamPro-Regular.ttf'),
    beVietnamPro_regular_italic: require('@assets/fonts/BeVietnamPro-Italic.ttf'),
    beVietnamPro_semiBold: require('@assets/fonts/BeVietnamPro-SemiBold.ttf'),
    beVietnamPro_semiBold_italic: require('@assets/fonts/BeVietnamPro-SemiBoldItalic.ttf'),
    beVietnamPro_bold: require('@assets/fonts/BeVietnamPro-Bold.ttf'),
    beVietnamPro_bold_italic: require('@assets/fonts/BeVietnamPro-BoldItalic.ttf'),
  });
