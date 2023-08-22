import { User } from "@/types/model";
import axiosInstance, { makeApiCall } from "@/utils/axios.utils";

const userApi = {
  getAllUsers: async () =>
    makeApiCall<User[]>(() => axiosInstance.get("/api/users")),
  getUserById: async (id: string) =>
    makeApiCall<User>(() => axiosInstance.get(`/api/users/${id}`)),
};

export default userApi;
