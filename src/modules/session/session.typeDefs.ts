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

export interface ICreateSessionRequest {
  sessionName: string;
  notaryField: INotarizationField;
  notaryService: INotarizationService;
  startTime: string;
  startDate: Date;
  endTime: string;
  endDate: Date;
  amount: number;
  users: {
    email: string;
  }[];
}

export interface ICreateSessionResponse {
  sessionId: string;
  notaryField: {
    name: string;
  };
  notaryService: {
    name: string;
  };
  sessionName: string;
  startTime: Date;
  startDate: Date;
  endTime: Date;
  endDate: Date;
  users: {
    email: string;
    status: string;
  }[];
  createdBy: string;
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
