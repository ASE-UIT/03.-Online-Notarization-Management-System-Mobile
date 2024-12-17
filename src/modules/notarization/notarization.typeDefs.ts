import { INotarizationField } from '@modules/notarizationField';
import { INotarizationService } from '@modules/notarizationService';

export interface INotarization {
  _id: string;
  notarizationService: INotarizationService;
  files: IFile[];
  notarizationField: INotarizationField;
  requestInfo: {
    fullName: string;
    citizenId: string;
    phoneNumber: string;
    email: string;
  };
  userId: string;
  createdAt: Date;
  amount: number;
  output: any;
  updatedAt: Date;
  v: number;
  status: {
    id: string;
    documentId: string;
    status: string;
    updatedAt: Date;
    v: number;
    feedback: string;
  };
}

export interface IFile {
  id: string;
  filename: string;
  firebaseUrl: string;
}
