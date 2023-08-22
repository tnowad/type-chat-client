import { User } from "@/types/model";
import axiosInstance, { ApiResponse, makeApiCall } from "@/utils/axios.utils";

const profileApi = {
  getProfile: async () =>
    makeApiCall<User>(() =>
      axiosInstance.get<ApiResponse<User>>(`/api/profile`)
    ),
};

export default profileApi;
