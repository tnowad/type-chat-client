"use client";
import chatApi from "@/apis/chat.api";
import messageApi from "@/apis/message.api";
import MessageItem from "@/components/widgets/MessageItem";
import useAuth from "@/hooks/useAuth";
import { Chat, Message } from "@/types/model";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { user } = useAuth();
  const [chat, setChat] = useState<Chat>();
  const [messages, setMessages] = useState<Message[]>();

  const [messageInput, setMessageInput] = useState<string>("");
  const [fileInput, setFileInput] = useState<File | null>(null);
  const inputFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await chatApi.getChatById(id);
      if (chat) {
        setChat(chat);
      }
    };

    const fetchMessages = async () => {
      const messages = await messageApi.getMessagesByChat(id);
      if (messages) {
        setMessages(messages);
      }
    };
    fetchChat();
    fetchMessages();
  }, [id]);

  const [isSidebarRightOpen, setIsSidebarRightOpen] = useState<boolean>(false);

  if (!chat || !user) {
    return null;
  }

  const handleAttackFile = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const sendMessage = async () => {
    if (!messageInput && !fileInput) {
      return;
    }

    if (messageInput) {
      await messageApi.createMessage(id, { type: "text", text: messageInput });
    }

    if (fileInput) {
      await messageApi.createMessage(id, { type: "file", file: fileInput });
    }

    setMessageInput("");
    setFileInput(null);
  };

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
                <div className="">
                  {messages?.map((message) => (
                    <MessageItem key={message._id} message={message} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between p-2 gap-3 h-[6vh]">
              <div>
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  className="hidden"
                  onChange={(e) =>
                    setFileInput(e.target.files?.item(0) ?? null)
                  }
                />
                <span onClick={handleAttackFile}>
                  <AttachFileIcon />
                </span>
              </div>
              {fileInput && (
                <div className="bg-gray-100 rounded-full whitespace-nowrap h-full flex items-center p-2 gap-2">
                  <span className="ml-2 bg-">{fileInput.name}</span>
                  <span onClick={() => setFileInput(null)}>
                    <BackspaceIcon />
                  </span>
                </div>
              )}
              <div className="w-full">
                <div className="bg-gray-100 flex rounded-full p-2">
                  <input
                    type="text"
                    placeholder="Aa"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                  <SendIcon onClick={sendMessage} />
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
