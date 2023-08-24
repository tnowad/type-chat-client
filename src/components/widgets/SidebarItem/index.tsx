import { Avatar, Typography } from "@mui/material";
import Image from "next/image";
import { HTMLAttributes } from "react";
interface SidebarItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  thumbnail?: string;
}

const SidebarItem = ({
  title,
  description,
  thumbnail,
  onClick,
}: SidebarItemProps) => {
  return (
    <div onClick={onClick} className="flex w-full cursor-pointer">
      <div className="mr-2">
        <Avatar className="h-[50px] w-[50px]">
          {thumbnail && <Image src={thumbnail} alt={title} />}
        </Avatar>
      </div>
      <div>
        <Typography>{title}</Typography>
        <Typography className="overflow-ellipsis inline-block overflow-hidden whitespace-nowrap w-[250px]">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default SidebarItem;
