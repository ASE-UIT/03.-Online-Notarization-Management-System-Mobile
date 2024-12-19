export interface ILoginResponse {
  user: IUser;
  tokens: {
    access: IToken;
    refresh: IToken;
  };
}

export interface IRegisterResponse {
  user: IUser;
  tokens: {
    access: IToken;
    refresh: IToken;
  };
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
  citizenId: string;
  phoneNumber: string;
  address: IAddress;
}

export interface IToken {
  token: string;
  expires: Date;
}

export interface IUserState {
  checked: boolean;
  loggedIn: boolean;
  user?: IUser;
  accessToken?: IToken;
  refreshToken?: IToken;
}

export interface IRefreshTokenResponse {
  access: IToken;
  refresh: IToken;
}

export interface IAddress {
  province: string;
  district: string;
  town: string;
  street: string;
}

export interface IUpdateUserRequest {
  name?: string;
  citizenId?: string;
  phoneNumber?: string;
  address?: IAddress;
}
