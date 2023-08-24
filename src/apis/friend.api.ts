import axiosInstance, { ApiResponse, makeApiCall } from "@/utils/axios.utils";
import { Friend, User } from "@/types/model";

const friendApi = {
  getFriendsByUser: async (userId: string) =>
    makeApiCall<Friend[]>(
      (data) =>
        axiosInstance.get<ApiResponse<Friend[]>>(
          `/api/friends/${userId}/friends`
        ),
      {}
    ),

  getPendingFriendByUser: async (userId: string) =>
    makeApiCall<Friend[]>(
      (data) =>
        axiosInstance.get<ApiResponse<Friend[]>>(
          `/api/friends/${userId}/pending-requests`
        ),
      {}
    ),

  sendFriendRequest: async (userId: string, friendId: string) =>
    makeApiCall<void>(
      (data) =>
        axiosInstance.post<ApiResponse>(`/api/friends/send-request`, {
          userId,
          friendId,
        }),
      {}
    ),

  acceptFriendRequest: async (requestId: string) =>
    makeApiCall<void>(
      (data) =>
        axiosInstance.put<ApiResponse>(
          `/api/friends/accept-request/${requestId}`
        ),
      {}
    ),

  rejectFriendRequest: async (requestId: string) =>
    makeApiCall<void>(
      (data) =>
        axiosInstance.delete<ApiResponse>(
          `/api/friends/reject-request/${requestId}`
        ),
      {}
    ),

  removeFriend: async (userId: string, friendId: string) =>
    makeApiCall<void>(
      (data) =>
        axiosInstance.delete<ApiResponse>(
          `/api/friends/${userId}/remove-friend/${friendId}`
        ),
      {}
    ),
};

export default friendApi;
