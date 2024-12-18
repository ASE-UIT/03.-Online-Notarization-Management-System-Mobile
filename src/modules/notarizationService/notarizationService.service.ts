import {
  IGetNotarizationServicesByFieldIdResponse,
  IGetNotarizationServicesByFieldIdRequest,
  IGetAllNotarrizationServicesResponse,
  INotarizationService,
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

async function getAllNotarizationServices(): Promise<IGetAllNotarrizationServicesResponse> {
  try {
    const response = await axiosConfig.get<IGetAllNotarrizationServicesResponse>(
      process.env.EXPO_PUBLIC_BACKEND_URL +
        `v1/notarization-services/get-all-notarization-services`,
    );
    return response.data;
  } catch (error) {
    console.log('Failed to fetch notarization services:', error);
    throw new Error('Failed to fetch notarization services');
  }
}

async function getNotarizationServiceById(serviceId: string): Promise<INotarizationService> {
  try {
    const response = await axiosConfig.get<INotarizationService>(
      process.env.EXPO_PUBLIC_BACKEND_URL +
        `v1/notarization-services/get-notarization-service/${serviceId}`,
    );
    return response.data;
  } catch (error) {
    console.log('Failed to fetch notarization service by Id:', error);
    throw new Error('Failed to fetch notarization service by Id');
  }
}

const NotarizationServiceService = {
  getNotarizationServicesByFieldId,
  getAllNotarizationServices,
  getNotarizationServiceById,
};

export default NotarizationServiceService;
