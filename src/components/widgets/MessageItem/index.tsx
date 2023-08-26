import useAuth from "@/hooks/useAuth";
import { Message, MessageContent } from "@/types/model";
import { Avatar } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";

interface MessageItemProps {
  message: Message;
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const MessageItem = ({ message }: MessageItemProps) => {
  const { user } = useAuth();
  const isFromMe = message.sender._id === user?._id;

  const renderMessageContent = (content: MessageContent) => {
    switch (content.type) {
      case "text":
        return (
          <div
            className={classNames(
              "ml-2 p-2 rounded-lg shadow",
              { "bg-blue-200": isFromMe },
              { "bg-gray-200": !isFromMe }
            )}
          >
            {content.text}
          </div>
        );
      case "image":
        return (
          <Image src={content.imageUrl} width={200} height={200} alt="Image" />
        );
      case "voice":
        return (
          <audio controls crossOrigin="anonymous" src={content.audioUrl} />
        );
      case "video":
        return (
          <video controls crossOrigin="anonymous" src={content.videoUrl} />
        );
      case "file":
        return (
          <div className="file-container">
            <a
              href={content.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Download File
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={classNames("w-full flex", {
        "justify-end": isFromMe,
        "items-end": !isFromMe,
      })}
    >
      <div className={classNames("flex", { "flex-row-reverse": isFromMe })}>
        <Avatar>
          {message.sender.avatar && (
            <Image src={message.sender.avatar} alt="user thumbnail" />
          )}
        </Avatar>
        <div>
          {renderMessageContent(message.content)}
          <div className="mt-2 text-sm text-gray-500">
            {formatTimestamp(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
