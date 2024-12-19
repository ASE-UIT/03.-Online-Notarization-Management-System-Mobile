import axiosConfig from '@utils/axiosConfig';
import { ICreateSessionRequest, ICreateSessionResponse, ISession } from './session.typeDefs';
import { create } from 'react-test-renderer';

async function getSessionByUserId(): Promise<ISession[]> {
  const response = await axiosConfig.get<{ results: ISession[] }>(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/session/getSessionsByUserId',
  );
  const sessions = response.data.results;

  const uniqueSessionsMap = new Map<string, ISession>();
  sessions.forEach(session => {
    if (!uniqueSessionsMap.has(session._id)) {
      uniqueSessionsMap.set(session._id, session);
    }
  });

  return Array.from(uniqueSessionsMap.values());
}

async function createSession(input: ICreateSessionRequest): Promise<ICreateSessionResponse> {
  const response = await axiosConfig.post<ICreateSessionResponse>(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/session/createSession',
    input,
  );
  return response.data;
}

async function addUserToSession(sessionId: string, emails: string[]): Promise<void> {
  try {
    await axiosConfig.patch(
      process.env.EXPO_PUBLIC_BACKEND_URL + `v1/session/addUser/${sessionId}`,
      {
        emails,
      },
    );
  } catch (error) {
    console.error('Error adding user to session:', error);
    throw error;
  }
}

async function deleteUserFromSession(sessionId: string, email: string): Promise<void> {
  try {
    await axiosConfig.patch(
      process.env.EXPO_PUBLIC_BACKEND_URL + `v1/session/deleteUser/${sessionId}`,
      {
        email,
      },
    );
  } catch (error) {
    console.error('Error deleting user from session:', error);
    throw error;
  }
}

const SessionService = {
  getSessionByUserId,
  createSession,
  addUserToSession,
  deleteUserFromSession,
};

export default SessionService;
