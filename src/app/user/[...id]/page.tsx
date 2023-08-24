"use client";
import friendApi from "@/apis/friend.api";
import userApi from "@/apis/user.api";
import useAuth from "@/hooks/useAuth";
import { User } from "@/types/model";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UserPageProps {
  params: {
    id: string;
  };
}
export default function UserPage({ params }: UserPageProps) {
  const { id } = params;
  const { user } = useAuth();
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userApi.getUserById(id);
        console.log(id, user);
        if (user) {
          setUserData(user);
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

  if (!userData) {
    return <div>User not found</div>;
  }

  const handleAddFriend = async () => {
    try {
      await friendApi.sendFriendRequest(user?._id!, userData._id);
      toast.success("Send request successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="rounded-md shadow-md p-2 w-96">
        <div className="w-full bg-gradient-to-r from-rose-100 to-teal-100 h-32 flex justify-center items-end relative mb-[40px]">
          <Avatar className="!w-20 !h-20 absolute translate-y-1/2 hover:scale-125 duration-150 shadow-md">
            {userData.avatar && (
              <Image src={userData.avatar} alt={"user thumbnail"} />
            )}
          </Avatar>
        </div>
        <div className="flex items-center flex-col">
          <h4 className="font-bold text-xl font-sans text-center">
            {userData.firstName + " " + userData.lastName}{" "}
            {userData.verified ? (
              <span className="!text-green-500">
                <DoneIcon />
              </span>
            ) : (
              <span className="!text-red-500">
                <CloseIcon />
              </span>
            )}
          </h4>
          <p>{userData.email}</p>
          <button
            onClick={handleAddFriend}
            className="text-white bg-yellow-400 hover:bg-yellow-500 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 w-2/3 font-sans font-extrabold"
          >
            Add friend
          </button>
        </div>
      </div>
    </div>
  );
}
