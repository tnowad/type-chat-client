import { Message, MessageContent } from "@/types/model";
import axiosInstance, { ApiResponse } from "@/utils/axios.utils";

const messageApi = {
  getMessagesByChat: async (chatId: string) => {
    try {
      const response = await axiosInstance.get<ApiResponse<Message[]>>(
        `/api/chats/${chatId}/messages`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  createMessage: async (
    chatId: string,
    content: { type: "text"; text: string } | { type: "file"; file: Blob }
  ) => {
    try {
      let formData = new FormData();
      formData.append("chatId", chatId);

      if (content.type === "text") {
        formData.append("contentType", "text");
        formData.append("text", content.text);
      } else {
        formData.append("contentType", "file");
        formData.append("file", content.file);
      }

      const response = await axiosInstance.post<ApiResponse<Message>>(
        `/api/chats/${chatId}/messages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  },

  getMessageById: async (chatId: string, messageId: string) => {
    try {
      const response = await axiosInstance.get<ApiResponse<Message>>(
        `/api/chats/${chatId}/messages/${messageId}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching message:", error);
      throw error;
    }
  },

  updateMessage: async (
    chatId: string,
    messageId: string,
    content: MessageContent
  ) => {
    try {
      const response = await axiosInstance.put<ApiResponse<Message>>(
        `/api/chats/${chatId}/messages/${messageId}`,
        {
          content,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating message:", error);
      throw error;
    }
  },

  deleteMessage: async (chatId: string, messageId: string) => {
    try {
      await axiosInstance.delete<ApiResponse>(
        `/api/chats/${chatId}/messages/${messageId}`
      );
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  },
};

export default messageApi;
