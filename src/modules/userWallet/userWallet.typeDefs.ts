export interface IUserWallet {
  user: string;
  nftItems: INFTItem[];
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface INFTItem {
  amount: number;
  _id: string;
  transactionHash: string;
  filename: string;
  tokenId: string;
  tokenURI: string;
  contractAddress: string;
  mintedAt: Date;
  selected?: boolean;
}
