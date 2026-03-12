import { IUser } from "./IUser";

export interface LoginResponse {
  msg: string;
  item: IUser;
  token: string;
}

export interface RegisterResponse {
  msg: string;
  item: IUser;
  token: string;
}

