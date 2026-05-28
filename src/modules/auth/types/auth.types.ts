export interface StoreDto {
  id: string;
  name: string;
  nameAr: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  taxNumber: string | null;
  logoUrl: string | null;
  currency: string;
  active: boolean;
  createdAt: string;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
  stores: StoreDto[];
  avatar?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  name: string;
  email: string;
  password: string;
  role?: string;
  acceptedTerms?: boolean;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: UserDto;
}

export interface ApiResult<TData, TErrors = Record<string, string[]>> {
  success: boolean;
  result: {
    data: TData;
  };
  errors?: TErrors;
}
