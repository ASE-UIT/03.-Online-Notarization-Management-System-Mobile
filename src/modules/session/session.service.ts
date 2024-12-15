import axiosConfig from '@utils/axiosConfig';
import { ISession } from './session.typeDefs';

async function getSessionByUserId(): Promise<ISession[]> {
  const response = await axiosConfig.get<{ results: ISession[] }>(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/session/getSessionsByUserId',
  );
  return response.data.results;
}

const SessionService = {
  getSessionByUserId,
};

export default SessionService;
