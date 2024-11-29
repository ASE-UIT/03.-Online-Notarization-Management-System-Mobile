// src/types/InputField.types.ts
export type InputFieldProps = {
  label: string;
  icon: any;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  toggleSecureTextEntry?: () => void;
  showPassword?: boolean;
};
