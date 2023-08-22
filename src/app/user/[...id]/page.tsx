"use client";
import userApi from "@/apis/user.api";
import { User } from "@/types/model";
import { Avatar, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

interface UserPageProps {
  params: {
    id: string;
  };
}
export default function UserPage({ params }: UserPageProps) {
  const { id } = params;
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userApi.getUserById(id);
        console.log(id, user);
        if (user) {
          setUser(user);
        }
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="rounded-md shadow-md p-2 w-96">
        <div className="w-full bg-gradient-to-r from-rose-100 to-teal-100 h-32 flex justify-center items-end relative mb-[40px]">
          <Avatar className="!w-20 !h-20 absolute translate-y-1/2 hover:scale-125 duration-150 shadow-md">
            {user.thumbnail && (
              <Image src={user.thumbnail} alt={"user thumbnail"} />
            )}
          </Avatar>
        </div>
        <div className="flex items-center flex-col">
          <h4 className="font-bold text-xl font-sans text-center">
            {user.firstName + " " + user.lastName}{" "}
            {user.verified ? (
              <span className="!text-green-500">
                <DoneIcon />
              </span>
            ) : (
              <span className="!text-red-500">
                <CloseIcon />
              </span>
            )}
          </h4>
          <p>{user.email}</p>
          <button className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 w-2/3 font-sans font-extrabold">
            Add friend
          </button>
        </div>
      </div>
    </div>
  );
}
