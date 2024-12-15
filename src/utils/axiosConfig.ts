import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import UserService from '@modules/user/user.service';
import { IRefreshTokenResponse } from '@modules/user';

const axiosConfig = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
});

// axiosConfig.defaults.timeout = 1000 * 60 * 10;

// axiosConfig.defaults.withCredentials = true;

axiosConfig.interceptors.request.use(
  async config => {
    const accessTokenString = await AsyncStorage.getItem('accessToken');
    const accessToken = accessTokenString ? JSON.parse(accessTokenString) : null;

    console.log('accessToken', accessToken?.token);
    if (accessToken?.token) {
      config.headers.Authorization = `Bearer ${accessToken.token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

let refreshTokenPromise: Promise<any> | null = null;

axiosConfig.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response?.status === 401) {
      const refreshTokenString = await AsyncStorage.getItem('refreshToken');
      const refreshToken = refreshTokenString ? JSON.parse(refreshTokenString) : null;

      UserService.logout(refreshToken?.token as string).then(() => {
        window.location.href = '/signin';
      });
    }

    if (error.response?.status !== 410) {
      console.log('status:', error.response?.status);
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
        text2: error.response?.data?.message || 'Vui lòng thử lại sau',
      });
      console.log('error', error.response?.data?.message);
    }
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && originalRequest) {
      if (!refreshTokenPromise) {
        const refreshTokenString = await AsyncStorage.getItem('refreshToken');
        const refreshToken = refreshTokenString ? JSON.parse(refreshTokenString) : null;

        interface AxiosErrorWithConfig extends Error {
          config?: any;
          response?: {
            status: number;
            data?: {
              message?: string;
            };
          };
        }

        refreshTokenPromise = UserService.refreshAccessToken(refreshToken.token as string)
          .then((response: IRefreshTokenResponse) => {
            const newAccessToken = response.access;
            AsyncStorage.setItem('accessToken', JSON.stringify(newAccessToken));
            axiosConfig.defaults.headers.Authorization = `Bearer ${newAccessToken.token}`;
            return axiosConfig(originalRequest);
          })
          .catch(async (error: AxiosErrorWithConfig) => {
            await UserService.logout(refreshToken as string).then(() => {
              window.location.href = '/signin';
            });
            return Promise.reject(error);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      if (refreshTokenPromise) {
        return refreshTokenPromise.then(() => axiosConfig(originalRequest));
      }
    }

    return Promise.reject(error);
  },
);

export default axiosConfig;
