import { User } from "@/types/model";

export interface AccessToken {
  token: string;
  expiresAt: number;
}

export interface RefreshToken {
  token: string;
  expiresAt: number;
}

export interface UserCredentials {
  user: User;
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}
