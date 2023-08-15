import Axios from "axios";

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export interface ApiResponse<T = object> {
  success?: boolean;
  message?: string;
  data?: T;
}

export default api;
