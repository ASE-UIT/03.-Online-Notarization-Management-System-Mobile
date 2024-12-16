import axiosConfig from '@utils/axiosConfig';
import { IUserWallet } from './userWallet.typeDefs';

async function getUserWallet(): Promise<IUserWallet> {
  const response = await axiosConfig.get<IUserWallet>(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/userWallet/wallet',
  );
  return response.data;
}

const UserWalletService = {
  getUserWallet,
};

export default UserWalletService;
