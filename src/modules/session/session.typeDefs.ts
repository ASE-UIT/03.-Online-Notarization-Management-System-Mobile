import { INotarizationField } from '@modules/notarizationField';
import { INotarizationService } from '@modules/notarizationService';

export interface ISession {
  _id: string;
  sessionName: string;
  notaryField: INotarizationField;
  notaryService: INotarizationService;
  startTime: string;
  startDate: Date;
  endTime: string;
  endDate: Date;
  users: ISessionUser[];
  createdBy: string;
  amount: number;
  files: IFile[];
  output: {
    _id: string;
    filename: string;
    firebaseUrl: string;
    transactionHash: string;
    uploadedAt: Date;
  }[];
  v: number;
  creator: {
    _id: string;
    email: string;
    name: string;
  };
  status: {
    _id: string;
    documentId: string;
    status: string;
    updatedAt: Date;
    feedback?: string;
  };
  signature: ISignature;
}

export interface ISignatureApprovalStatus {
  notary: {
    approved: boolean;
    approvedAt: Date | null;
  };
  user: {
    approved: boolean;
    approvedAt: Date;
  };
}

export interface ISignature {
  _id: string;
  approvalStatus: ISignatureApprovalStatus;
  documentId: string;
  signatureImage: string;
  createdAt: Date;
  updatedAt: Date;
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
  _id: string;
  email: string;
}

export interface IFile {
  id: string;
  filename: string;
  firebaseUrl: number;
  createAt: Date;
}
