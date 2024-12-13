import axios from 'axios';
import {
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenResponse,
  IRegisterRequest,
  IRegisterResponse,
} from './user.typeDefs';
import axiosConfig from '@utils/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function login(data: ILoginRequest): Promise<ILoginResponse> {
  console.log('Url', process.env.EXPO_PUBLIC_BACKEND_URL);
  const response = await axiosConfig.post<ILoginResponse>(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/auth/login',
    data,
  );
  AsyncStorage.setItem('accessToken', JSON.stringify(response.data.tokens.access));
  AsyncStorage.setItem('refreshToken', JSON.stringify(response.data.tokens.refresh));
  return response.data;
}
async function register(data: IRegisterRequest): Promise<IRegisterResponse> {
  const response = await axiosConfig.post<ILoginResponse>(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/auth/register',
    data,
  );
  AsyncStorage.setItem('accessToken', JSON.stringify(response.data.tokens.access));
  AsyncStorage.setItem('refreshToken', JSON.stringify(response.data.tokens.refresh));
  AsyncStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data;
}
async function logout(refreshToken: string): Promise<void> {
  try {
    await axios.post(process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/auth/logout', {
      refreshToken,
    });
  } catch (err) {
    return Promise.reject(err);
  }
}
async function refreshAccessToken(refreshToken: string): Promise<IRefreshTokenResponse> {
  try {
    const response = await axios.post<IRefreshTokenResponse>(
      process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/auth/refresh-token',
      {
        refreshToken,
      },
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

const UserService = {
  login,
  logout,
  refreshAccessToken,
  register,
};

export default UserService;
