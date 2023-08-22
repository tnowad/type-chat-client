"use client";
import Axios, { AxiosError, AxiosResponse } from "axios";

const getAccessToken = () => {
  try {
    if (document) return document.cookie.split("accessToken=")[1];
  } catch (error) {}
};

const accessToken = getAccessToken();
const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

type ApiCall<T> = (data?: any) => Promise<AxiosResponse<ApiResponse<T>, any>>;

export const makeApiCall = async <T>(
  apiCall: ApiCall<T>,
  data?: any
): Promise<T | null> => {
  try {
    const response = await apiCall(data);

    if (response.data && response.data.success) {
      return response.data.data || null;
    } else {
      throw new Error(response.data.message || "Request was not successful.");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(error.response.data.message || "An error occurred.");
      } else {
        throw new Error("An error occurred while making the request.");
      }
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
}

export default axiosInstance;
