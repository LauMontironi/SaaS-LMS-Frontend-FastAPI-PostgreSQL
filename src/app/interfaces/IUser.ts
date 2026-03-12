export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  phone: string;
  address: string;
  role: string;
  is_active: boolean;
}

export interface IUserCreate {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar_url?: string | null;
  phone?: string | null;
  address?: string | null;
  is_active?: boolean;
}