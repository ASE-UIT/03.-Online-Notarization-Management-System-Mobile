import { IDocumentHistoryStatus } from '@modules/document';
import { ISession } from '@modules/session/session.typeDefs';
import { ISendingDocumentFromWallet } from '@modules/userWallet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  HomeStack: undefined;
  DetailsStack: { from: string };
  ProfileStack: undefined;
  PolicyStack: undefined;
  WalletStack: undefined;
  QRCodeStack: undefined;
  TabNavigator: undefined;
  SessionDetailStack: { session: ISession };
  NotarizationHistoryStack: undefined;
  NotarizationDetailStack: { notarization: any };
  SignScreenStack: { text: string; onOK: (signature: string) => void };
  ForgetPasswordStack: undefined;
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
  ProvideInformation: { returnedObject: ISendingDocumentFromWallet } | undefined;
  ConfirmInformation: undefined;
  GetWalletDocument: { onGoBack: (data: any) => void };

  DetailDocument: { document: IDocumentHistoryStatus };
  Signature: { documentId: string };

  Service: undefined;
  ServiceDetail: { serviceId: string };
  SendNFT: undefined;
};

export type StackProps = NativeStackScreenProps<StackParamList, keyof StackParamList>;
