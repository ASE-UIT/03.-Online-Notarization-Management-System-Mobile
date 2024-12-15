import {
  IGetNotarizationServicesByFieldIdResponse,
  IGetNotarizationServicesByFieldIdRequest,
} from './notarizationService.typeDefs';
import axiosConfig from '@utils/axiosConfig';

async function getNotarizationServicesByFieldId(
  data: IGetNotarizationServicesByFieldIdRequest,
): Promise<IGetNotarizationServicesByFieldIdResponse> {
  try {
    const response = await axiosConfig.get<IGetNotarizationServicesByFieldIdResponse>(
      process.env.EXPO_PUBLIC_BACKEND_URL +
        `v1/notarization-services/get-notarization-services-by-field-id/${data}`,
    );
    return response.data;
  } catch (error) {
    console.log('Failed to fetch notarization services:', error);
    throw new Error('Failed to fetch notarization services');
  }
}

const NotarizationServiceService = {
  getNotarizationServicesByFieldId,
};

export default NotarizationServiceService;