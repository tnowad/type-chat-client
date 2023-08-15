import User from "@/types/User";
import api from "@/utils/api.utils";
export interface ApiResponse<T = object> {
  success?: boolean;
  message?: string;
  data?: T;
}

export interface LoginResponseData {
  accessToken: string;
  user: User;
  refreshToken: string;
}

const authApi = {
  login: async (values: { email: string; password: string }) =>
    await api.post<ApiResponse<LoginResponseData>>(`/api/auth/login`, values),

  register: async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => await api.post<ApiResponse>(`/api/auth/register`, values),

  verifyOTP: async (values: { email: string; otp: string }) =>
    await api.post<ApiResponse>(`/api/auth/verify-otp`, values),

  sendOTP: async (values: { email: string }) =>
    await api.post<ApiResponse>(`/api/auth/send-otp`, values),

  forgetPassword: async (values: { email: string }) =>
    await api.post<ApiResponse>(`/api/auth/forget-password`, values),

  resetPassword: async (values: { token: string; newPassword: string }) =>
    await api.post<ApiResponse>(`/api/auth/reset-password`, values),

  refreshToken: async (values: { token: string; newPassword: string }) =>
    await api.post<ApiResponse>(`/api/auth/refresh-token`, values),

  me: async () => await api.get<ApiResponse<{ user: User }>>(`/api/auth/me`),
};

export default authApi;
