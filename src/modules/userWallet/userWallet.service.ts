import axiosConfig from '@utils/axiosConfig';
import { IUserWallet } from './userWallet.typeDefs';

async function getUserWallet(): Promise<IUserWallet> {
  const response = await axiosConfig.get<IUserWallet>(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/userWallet/wallet',
  );
  const filteredNFTItems = response.data.nftItems.filter(item => item.amount !== 0);

  return {
    ...response.data,
    nftItems: filteredNFTItems,
  };
}

async function transferNFT(
  transactionHash: string,
  toUserEmail: string,
  amount: number,
): Promise<string> {
  const response = await axiosConfig.post(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/userWallet/wallet/transfer',
    {
      transactionHash,
      toUserEmail,
      amount,
    },
  );
  return response.data;
}

async function buyNFT(itemId: string, amount: number): Promise<string> {
  const response = await axiosConfig.post(
    process.env.EXPO_PUBLIC_BACKEND_URL + 'v1/userWallet/wallet/purchase',
    {
      itemId,
      amount,
    },
  );
  return response.data;
}

const UserWalletService = {
  getUserWallet,
  transferNFT,
  buyNFT,
};

export default UserWalletService;
