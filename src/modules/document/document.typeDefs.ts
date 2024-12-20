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
  files?: {
    name: string;
    uri: string;
    size: number;
    mimeType: string;
  }[];
  fileIds?: string[];
  customFileNames?: string[];
  amount: number;
}

export interface IUploadDocumentRequest {
  notarizationService: INotarizationService;
  files?: {
    name: string | number;
    uri: string;
    type: string;
  }[];
  notarizationField: INotarizationField;
  requesterInfo: {
    fullName: string | undefined;
    citizenId: string | undefined;
    phoneNumber: string | undefined;
    email: string | undefined;
  };
  amount: number;
  fileIds?: string[];
  customFileNames?: string[];
}

export interface IUploadDocumentResponse {
  notarizationService: INotarizationService;
  files: {
    _id: string;
    filename: string;
    firebaseUrl: string;
  }[];
  notarizationField: INotarizationField;
  requesterInfo: {
    fullName: string | undefined;
    citizenId: string | undefined;
    phoneNumber: string | undefined;
    email: string | undefined;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  output: any[];
  id: string;
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

export interface IDocumentHistoryStatus {
  _id: string;
  files: {
    _id: string;
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
  updatedAt: Date;
  status: {
    _id: string;
    documentId: string;
    status: string;
    updatedAt: Date;
    feedback?: string;
  };
  output: {
    _id: string;
    filename: string;
    firebaseUrl: string;
    transactionHash: string;
    uploadedAt: Date;
  }[];
  signature: ISignature;
}

export type IDocumentHistoryStatusResponse = IDocumentHistoryStatus[];
