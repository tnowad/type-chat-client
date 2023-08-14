import api from "@/utils/api.utils";

const authApi = {
  login: async (values: { email: string; password: string }) =>
    await api.post(`/api/auth/login`, values),

  register: async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => await api.post(`/api/auth/register`, values),

  verifyOTP: async (values: { email: string; otp: string }) =>
    await api.post(`/api/auth/verify-otp`, values),

  sendOTP: async (values: { email: string }) =>
    await api.post(`/api/auth/send-otp`, values),

  forgetPassword: async (values: { email: string }) =>
    await api.post(`/api/auth/forget-password`, values),

  resetPassword: async (values: { token: string; newPassword: string }) =>
    await api.post(`/api/auth/reset-password`, values),

  refreshToken: async (values: { token: string; newPassword: string }) =>
    await api.post(`/api/auth/refresh-token`, values),
};

export default authApi;
