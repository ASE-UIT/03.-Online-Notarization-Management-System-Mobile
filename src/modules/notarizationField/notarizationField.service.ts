import {
  IGetAllNotarizationFieldResponse,
  IGetNotarizationFieldByIdResponse,
} from './notarizationField.typeDefs';
import axiosConfig from '@utils/axiosConfig';

async function getAllNotarizationField(): Promise<IGetAllNotarizationFieldResponse> {
  try {
    const response = await axiosConfig.get<IGetAllNotarizationFieldResponse>(
      process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/notarization-fields/get-all-notarization-fields',
    );
    return response.data;
  } catch (error) {
    console.log('Failed to fetch notarization fields:', error);
    throw new Error('Failed to fetch notarization fields');
  }
}

async function getNotarizationFieldById(
  fieldId: string,
): Promise<IGetNotarizationFieldByIdResponse> {
  try {
    const response = await axiosConfig.get<IGetNotarizationFieldByIdResponse>(
      process.env.EXPO_PUBLIC_BACKEND_URL +
        `v1/notarization-fields/get-notarization-field/${fieldId}`,
    );
    return response.data;
  } catch (error) {
    console.log('Failed to fetch notarization fields by Id:', error);
    throw new Error('Failed to fetch notarization fields by Id');
  }
}

const NotarizationFieldService = {
  getAllNotarizationField,
  getNotarizationFieldById,
};

export default NotarizationFieldService;
