import { Chat, ChatPreview } from "@/types/model"; // Import the type for Chat if available
import axiosInstance, { ApiResponse, makeApiCall } from "@/utils/axios.utils";

const chatApi = {
  getAllChats: async () =>
    makeApiCall<ChatPreview[]>(
      () => axiosInstance.get<ApiResponse<ChatPreview[]>>("/api/chats"),
      {}
    ),

  getChatById: async (chatId: string) =>
    makeApiCall<Chat>(
      () => axiosInstance.get<ApiResponse<Chat>>(`/api/chats/${chatId}`),
      {}
    ),

  createChat: async (
    participants: string[],
    name?: string,
    thumbnail?: string
  ) =>
    makeApiCall<Chat>(
      (data) => axiosInstance.post<ApiResponse<Chat>>("/api/chats", data),
      { participants, name, thumbnail }
    ),

  updateChat: async (chatId: string, name: string, thumbnail: string) =>
    makeApiCall<Chat>(
      (data) =>
        axiosInstance.put<ApiResponse<Chat>>(`/api/chats/${chatId}`, data),
      { name, thumbnail }
    ),

  deleteChat: async (chatId: string) =>
    makeApiCall<void>(
      () => axiosInstance.delete<ApiResponse>(`/api/chats/${chatId}`),
      {}
    ),
};

export default chatApi;
