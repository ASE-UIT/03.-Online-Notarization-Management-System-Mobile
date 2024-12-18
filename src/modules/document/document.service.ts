import axiosConfig from '@utils/axiosConfig';
import {
  IUploadDocumentResponse,
  IDocumentHistoryStatusResponse,
  IDocumentHistoryStatus,
} from './document.typeDefs';
import FormData from 'form-data';

async function uploadDocument(data: FormData): Promise<IUploadDocumentResponse> {
  try {
    const response = await axiosConfig.post<IUploadDocumentResponse>(
      process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/notarization/upload-files',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to upload:', error);
    throw new Error('Failed to upload');
  }
}

async function getDocumentHistoryWithStatus(): Promise<IDocumentHistoryStatusResponse> {
  try {
    const response = await axiosConfig.get<IDocumentHistoryStatusResponse>(
      process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/notarization/get-history-with-status',
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get document history:', error);
    throw new Error('Failed to get document history');
  }
}

async function getDocumentDetail(documentId: string): Promise<IDocumentHistoryStatus> {
  try {
    const response = await axiosConfig.get<IDocumentHistoryStatus>(
      process.env.EXPO_PUBLIC_BACKEND_URL + `v1/notarization/document/${documentId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get document detail:', error);
    throw new Error('Failed to get document detail');
  }
}

async function approveSignatureByUser(data: FormData): Promise<string> {
  try {
    const response = await axiosConfig.post<string>(
      process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/notarization/approve-signature-by-user',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to approve signature by user:', error);
    throw new Error('Failed to approve signature by user');
  }
}

const DocumentService = {
  uploadDocument,
  getDocumentHistoryWithStatus,
  getDocumentDetail,
  approveSignatureByUser,
};

export default DocumentService;
