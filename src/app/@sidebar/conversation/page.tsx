"use client";
import chatApi from "@/apis/chat.api";
import SidebarItem from "@/components/widgets/SidebarItem";
import useAuth from "@/hooks/useAuth";
import { ChatPreview } from "@/types/model";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Paper, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function ConversationSidebarPage() {
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const fetchListChats = async () => {
      try {
        const chats = await chatApi.getAllChats();
        if (chats) {
          setChats(chats);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    fetchListChats();
  }, []);

  if (!user) {
    return;
  }

  return (
    <div className="flex flex-col h-full p-2 gap-y-2">
      <Typography variant="h5">Conversation</Typography>
      <Paper
        variant="outlined"
        className="rounded-full mt-1 px-1 flex items-center"
      >
        <SearchIcon />
        <InputBase className="w-full" />
      </Paper>
      <div className="h-full w-full flex flex-col gap-y-2">
        {chats.map((chat) => (
          <SidebarItem
            key={chat._id}
            title={
              chat.name ??
              chat.participants
                .filter((participant) => participant._id != user._id)
                .map(
                  (participant) =>
                    participant.firstName + " " + participant.lastName + " "
                )
            }
            onClick={() => {
              router.push(`/conversation/${chat._id}`);
            }}
            description={
              chat.lastMessage ?? "Write a message to start a conversation"
            }
          />
        ))}

        <div className="flex w-full ">
          <div className="mr-2">
            <Skeleton variant="circular" width={50} height={50} />
          </div>
          <div>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={250} />
          </div>
        </div>
      </div>
    </div>
  );
}
