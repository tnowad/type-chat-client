import useAuth from "@/hooks/useAuth";
import { Message, MessageContent } from "@/types/model";
import { Avatar } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const { user } = useAuth();

  const renderMessageContent = (content: MessageContent) => {
    switch (content.type) {
      case "text":
        return <div className="message-text">{content.text}</div>;
      case "image":
        return <Image src={content.imageUrl} alt="Image" />;
      case "voice":
        return <audio controls src={content.audioUrl} />;
      case "video":
        return <video controls src={content.videoUrl} />;
      case "file":
        return (
          <div className="file-container">
            <a href={content.fileUrl} target="_blank" rel="noopener noreferrer">
              Download File
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  const isFromMe = message.sender._id === user?._id;

  return (
    <div className={classNames("w-full flex", { "justify-end": isFromMe })}>
      <Avatar>
        {message.sender.avatar && (
          <Image src={message.sender.avatar} alt={"user thumbnail"} />
        )}
      </Avatar>
      <div>{renderMessageContent(message.content)}</div>
      <div className="message-time">{message.timestamp}</div>
    </div>
  );
};

export default MessageItem;
