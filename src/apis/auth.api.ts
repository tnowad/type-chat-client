import axiosInstance, { ApiResponse } from "@/utils/axios.utils";
import { User } from "@/types/model";
import { AccessToken, UserCredentials } from "@/types/auth";

const authApi = {
  login: async (email: string, password: string) =>
    await axiosInstance.post<ApiResponse<UserCredentials>>(`/api/auth/login`, {
      email,
      password,
    }),

  register: async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => await axiosInstance.post<ApiResponse>(`/api/auth/register`, values),

  verifyOTP: async (values: { email: string; otp: string }) =>
    await axiosInstance.post<ApiResponse>(`/api/auth/verify-otp`, values),

  sendOTP: async (values: { email: string }) =>
    await axiosInstance.post<ApiResponse>(`/api/auth/send-otp`, values),

  forgetPassword: async (values: { email: string }) =>
    await axiosInstance.post<ApiResponse>(`/api/auth/forget-password`, values),

  resetPassword: async (values: { token: string; newPassword: string }) =>
    await axiosInstance.post<ApiResponse>(`/api/auth/reset-password`, values),

  refreshToken: async (values: { refreshToken: string }) =>
    await axiosInstance.post<ApiResponse<{ accessToken: AccessToken }>>(
      `/api/auth/refresh-token`,
      values
    ),
};

export default authApi;
