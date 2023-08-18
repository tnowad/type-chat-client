import { User } from "@/types/model";
import axiosInstance, { ApiResponse } from "@/utils/axios.utils";

const profileApi = {
  getProfile: async () =>
    await axiosInstance.get<ApiResponse<{ user: User }>>(`/api/profile`),
};

export default profileApi;
