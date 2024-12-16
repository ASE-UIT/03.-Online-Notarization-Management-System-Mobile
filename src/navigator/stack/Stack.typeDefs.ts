import { ProvideInformation } from '@views/Notarization';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  HomeStack: undefined;
  DetailsStack: { from: string };
  ProfileStack: undefined;
  PolicyStack: undefined;
  WalletStack: undefined;
  QRCodeStack: undefined;
  // add more screen props...

  SignInStack: undefined;
  SignUpStack: undefined;

  SearchStack: undefined;
  SessionStack: undefined;

  OtherStack: undefined;
  AddSessionStack: undefined;
  QRScanStack: undefined;
  TransferNFTStack: undefined;

  CreateServiceAndField: undefined;
  ProvideInformation: undefined;
  ConfirmInformation: undefined;
};

export type StackProps = NativeStackScreenProps<StackParamList, keyof StackParamList>;
