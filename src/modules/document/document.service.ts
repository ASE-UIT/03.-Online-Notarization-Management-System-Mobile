import axiosConfig from '@utils/axiosConfig';
import { IUploadDocumentResponse } from './document.typeDefs';
import FormData from 'form-data';

async function uploadDocument(data: FormData): Promise<IUploadDocumentResponse> {
  try {
    const response = await axiosConfig.post<IUploadDocumentResponse>(
      process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/notarization/upload-files',
      data,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to upload:', error);
    throw new Error('Failed to upload');
  }
}

const DocumentService = {
  uploadDocument,
};

export default DocumentService;
