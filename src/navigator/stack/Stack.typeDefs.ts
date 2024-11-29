import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  HomeStack: undefined;
  DetailsStack: { from: string };
  ProfileStack: undefined;
  // add more screen props...

  SignInStack: undefined;
  SignUpStack: undefined;

  SearchStack: undefined;
  SessionStack: undefined;
  OtherStack: undefined;
  QRScanStack: undefined;
};

export type StackProps = NativeStackScreenProps<StackParamList, keyof StackParamList>;
