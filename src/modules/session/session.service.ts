import axiosConfig from '@utils/axiosConfig';
import { ICreateSessionRequest, ICreateSessionResponse, ISession } from './session.typeDefs';
import { create } from 'react-test-renderer';

async function getSessionByUserId(): Promise<ISession[]> {
  const response = await axiosConfig.get<{ results: ISession[] }>(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/session/getSessionsByUserId',
  );
  return response.data.results;
}

async function createSession(input: ICreateSessionRequest): Promise<ICreateSessionResponse> {
  const response = await axiosConfig.post<ICreateSessionResponse>(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/session/createSession',
    input,
  );
  return response.data;
}

const SessionService = {
  getSessionByUserId,
  createSession,
};

export default SessionService;
