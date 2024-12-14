import { INotarizationField } from '@modules/notarizationField';
import { INotarizationService } from '@modules/notarizationService';

export interface IDocument {
  id: string;
  files: {
    filename: string;
    firebaseUrl: string;
  }[];
  notarizationService: INotarizationService;
  notarizationField: INotarizationField;
  requesterInfo: {
    fullName: string;
    citizenId: string;
    phoneNumber: string;
    email: string;
  };
  userId: string;
  amount: number;
  createdAt: Date;
}

export interface IDocumentState {
  notarizationService: INotarizationService | undefined;
  notarizationField: INotarizationField | undefined;
  requesterInfo: {
    fullName: string | undefined;
    citizenId: string | undefined;
    phoneNumber: string | undefined;
    email: string | undefined;
  };
  files: {
    name: string;
    uri: string;
    type: string;
    size: number;
  }[];
  amount: number;
}
