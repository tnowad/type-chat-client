import { User } from "@/types/model";
import axiosInstance, { makeApiCall } from "@/utils/axios.utils";

const userApi = {
  getAllUsers: async () =>
    makeApiCall<User[]>(() => axiosInstance.get("/api/users")),
};

export default userApi;
