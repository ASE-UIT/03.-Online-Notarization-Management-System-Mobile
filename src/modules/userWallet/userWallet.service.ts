import axiosConfig from '@utils/axiosConfig';
import { IUserWallet } from './userWallet.typeDefs';

async function getUserWallet(): Promise<IUserWallet> {
  const response = await axiosConfig.get<IUserWallet>(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/userWallet/wallet',
  );
  return response.data;
}

async function transferNFT(
  transactionHash: string,
  toUserId: string,
  amount: number,
): Promise<string> {
  const response = await axiosConfig.post(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/userWallet/wallet/transfer',
    {
      transactionHash,
      toUserId,
      amount,
    },
  );
  return response.data;
}

const UserWalletService = {
  getUserWallet,
  transferNFT,
};

export default UserWalletService;
