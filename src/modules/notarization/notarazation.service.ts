import axiosConfig from '@utils/axiosConfig';
import { INotarization } from './notarization.typeDefs';

async function getHistoryByUserId(userId: string): Promise<INotarization[]> {
  const response = await axiosConfig.get<INotarization[]>(
    process.env.EXPO_PUBLIC_BACKEND_URL + `v1/notarization/get-history-by-user-id/${userId}`,
  );
  return response.data;
}

const notarizationService = {
  getHistoryByUserId,
};

export default notarizationService;
