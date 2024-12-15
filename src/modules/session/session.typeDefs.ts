import { INotarizationField } from '@modules/notarizationField';
import { INotarizationService } from '@modules/notarizationService';

export interface ISession {
  id: string;
  sessionName: string;
  notaryField: INotarizationField;
  notaryService: INotarizationService;
  startTime: Date;
  startDate: Date;
  endTime: Date;
  endDate: Date;
  users: ISessionUser[];
  createdBy: string;
  files: IFile[];
  v: number;
  amount: number;
  creator: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ISessionUser {
  status: string;
  id: string;
  email: string;
}

export interface IFile {
  id: string;
  filename: string;
  firebaseUrl: number;
  createAt: Date;
}
