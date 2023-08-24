"use client";
import chatApi from "@/apis/chat.api";
import friendApi from "@/apis/friend.api";
import userApi from "@/apis/user.api";
import useAuth from "@/hooks/useAuth";
import { Friend, User } from "@/types/model";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [friend, setFriend] = useState<Friend>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userApi.getUserById(id);
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

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        if (!userData) {
          return;
        }
        const friend = await friendApi.getFriendRelationship(userData._id);
        if (friend) {
          setFriend(friend);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    };

    fetchFriend();
  }, [userData]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!userData || !user) {
    return <div>User not found</div>;
  }

  const handleAddFriend = async () => {
    try {
      await friendApi.sendFriendRequest(user?._id, userData._id);
      setFriend((value) => ({
        ...value!,
        status: "pending",
        friend: userData._id,
      }));
      toast.success("Friend request sent successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleUnfriend = async () => {
    try {
      await friendApi.removeFriend(user._id, userData._id);
      setFriend((value) => ({ ...value!, status: "rejected" }));
      toast.success("Unfriended successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleReject = async () => {
    try {
      if (!friend) {
        return;
      }
      await friendApi.rejectFriendRequest(friend?._id);
      setFriend((value) => ({ ...value!, status: "rejected" }));
      toast.success("Friend request rejected");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleCreateNewChat = async () => {
    try {
      const chat = await chatApi.createChat([user._id, userData._id]);
      toast.success("Create new chat successful");
      if (chat) {
        router.push(`/conversation/${chat._id}`);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleAccept = async () => {
    try {
      if (!friend) {
        return;
      }
      await friendApi.acceptFriendRequest(friend?._id);
      setFriend((value) => ({ ...value!, status: "accepted" }));
      toast.success("Friend request accepted");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const renderFriendButton = () => {
    if (!userData || userData._id === user?._id) {
      return null;
    }

    if (friend?.status === "accepted") {
      return (
        <div className="flex space-x-2 w-full">
          <button
            onClick={handleUnfriend}
            className="text-white bg-red-400 hover:bg-red-500 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 w-1/2 font-sans font-extrabold"
          >
            Unfriend
          </button>
          <button
            onClick={handleCreateNewChat}
            className="text-white bg-green-400 hover:bg-green-500 rounded-full text-sm px-5 py-2.5 text-center mb-2 w-1/2 font-sans font-extrabold"
          >
            New Chat
          </button>
        </div>
      );
    }

    if (friend?.status === "pending") {
      if (friend.friend === userData._id) {
        return (
          <button
            onClick={handleReject}
            className="text-white bg-red-400 hover:bg-red-500 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 w-2/3 font-sans font-extrabold"
          >
            Reject request
          </button>
        );
      }
      return (
        <button
          onClick={handleAccept}
          className="text-white bg-green-400 hover:bg-green-500 rounded-full text-sm px-5 py-2.5 text-center mb-2 w-1/2 font-sans font-extrabold"
        >
          Accept
        </button>
      );
    }

    return (
      <button
        onClick={handleAddFriend}
        className="text-white bg-yellow-400 hover:bg-yellow-500 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 w-2/3 font-sans font-extrabold"
      >
        Add friend
      </button>
    );
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
          {renderFriendButton()}
          <div></div>
        </div>
      </div>
    </div>
  );
}
