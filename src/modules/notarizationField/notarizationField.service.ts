import { IGetAllNotarizationFieldResponse } from './notarizationField.typeDefs';
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

const NotarizationFieldService = {
  getAllNotarizationField,
};

export default NotarizationFieldService;
