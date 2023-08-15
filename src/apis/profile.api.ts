import User from "@/types/User";
import api, { ApiResponse } from "@/utils/api.utils";

const profileApi = {
  getProfile: async () =>
    await api.get<ApiResponse<{ user: User }>>(`/api/profile`),
};

export default profileApi;
