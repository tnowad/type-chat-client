"use client";
import chatApi from "@/apis/chat.api";
import useAuth from "@/hooks/useAuth";
import { Chat } from "@/types/model";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CallIcon from "@mui/icons-material/Call";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { user } = useAuth();
  const [chat, setChat] = useState<Chat>();

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await chatApi.getChatById(id);
      if (chat) {
        setChat(chat);
      }
    };

    fetchChat();
  }, [id]);

  const [isSidebarRightOpen, setIsSidebarRightOpen] = useState<boolean>(false);

  if (!chat || !user) {
    return null;
  }

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col grow">
        <div className="flex w-full justify-between items-center p-2 border-b h-[6vh]">
          <div className="flex hover:bg-gray-100 p-1 rounded duration-200">
            <div className="w-10 h-10 relative">
              <Avatar />
              <span className="absolute w-2 h-2 bg-green-400 rounded-full right-0 bottom-[2px]" />
            </div>
            <div className="ml-2 font-serif">
              <p className="text-md">
                {chat?.name ??
                  chat.participants
                    .filter((participant) => participant._id != user._id)
                    .map(
                      (participant) =>
                        participant.firstName + " " + participant.lastName + " "
                    )}
              </p>
              <p className="text-sm text-gray-800">online</p>
            </div>
          </div>
          <div className="flex">
            <CallIcon />
            <VideocamIcon />
            <div onClick={() => setIsSidebarRightOpen((value) => !value)}>
              <MoreHorizIcon />
            </div>
          </div>
        </div>
        <div className="grow">
          <div className="h-full flex flex-col">
            <div className="overflow-y-scroll h-[88vh] flex flex-col-reverse">
              <div>
                <div className="h-[200vh]">Message list</div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between p-2 gap-3 h-[6vh]">
              <div>
                <AttachFileIcon />
              </div>
              <div className="w-full">
                <div className="bg-gray-100 flex rounded-full p-2">
                  <input
                    type="text"
                    placeholder="Aa"
                    className="w-full bg-transparent outline-none"
                  />
                  <EmojiEmotionsIcon />
                </div>
              </div>
              <div>
                <ThumbUpIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSidebarRightOpen && (
        <div className="border-l w-[300px]">sidebar left</div>
      )}
    </div>
  );
}
