import { AccessToken, UserCredentials } from "@/types/auth";
import axiosInstance, { ApiResponse, makeApiCall } from "@/utils/axios.utils";

const authApi = {
  login: async (email: string, password: string) =>
    makeApiCall<UserCredentials>(
      (data) =>
        axiosInstance.post<ApiResponse<UserCredentials>>(
          `/api/auth/login`,
          data
        ),
      { email, password }
    ),

  register: async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) =>
    makeApiCall<void>(
      (data) => axiosInstance.post<ApiResponse>(`/api/auth/register`, data),
      values
    ),

  verifyOTP: async (values: { email: string; otp: string }) =>
    makeApiCall<void>(
      (data) => axiosInstance.post<ApiResponse>(`/api/auth/verify-otp`, data),
      values
    ),

  sendOTP: async (values: { email: string }) =>
    makeApiCall<void>(
      (data) => axiosInstance.post<ApiResponse>(`/api/auth/send-otp`, data),
      values
    ),

  forgetPassword: async (values: { email: string }) =>
    makeApiCall<void>(
      (data) =>
        axiosInstance.post<ApiResponse>(`/api/auth/forget-password`, data),
      values
    ),

  resetPassword: async (values: { token: string; newPassword: string }) =>
    makeApiCall<void>(
      (data) =>
        axiosInstance.post<ApiResponse>(`/api/auth/reset-password`, data),
      values
    ),

  refreshToken: async (values: { refreshToken: string }) =>
    makeApiCall<AccessToken>(
      (data) =>
        axiosInstance.post<ApiResponse<AccessToken>>(
          `/api/auth/refresh-token`,
          data
        ),
      values
    ),
};

export default authApi;
