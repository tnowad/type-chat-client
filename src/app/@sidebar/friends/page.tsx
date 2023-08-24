"use client";
import Image from "next/image";
import { Typography, InputBase, Paper, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Friend } from "@/types/model";
import { useRouter } from "next/navigation";
import friendApi from "@/apis/friend.api";
import useAuth from "@/hooks/useAuth";
export default function FriendsSidebarPage() {
  const { user } = useAuth();

  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingFriends, setPendingFriends] = useState<Friend[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchAllFriends = async () => {
      const friends = await friendApi.getFriendsByUser(user?._id!);
      if (friends) {
        setFriends(friends);
      }
    };
    fetchAllFriends();
  }, [user]);

  useEffect(() => {
    const fetchAllFriends = async () => {
      const friends = await friendApi.getPendingFriendByUser(user?._id!);
      if (friends) {
        setPendingFriends(friends);
      }
    };
    fetchAllFriends();
  }, [user]);

  return (
    <div className="flex flex-col h-full p-2 gap-y-2">
      <Typography variant="h5">Friend</Typography>
      <Paper
        variant="outlined"
        className="rounded-full mt-1 px-1 flex items-center"
      >
        <SearchIcon />
        <InputBase className="w-full" />
      </Paper>
      <div className="h-full w-full flex flex-col gap-y-2">
        {friends.map((friend) => (
          <div
            onClick={() => router.push(`/user/${friend.user._id}`)}
            key={friend._id}
            className="flex w-full cursor-pointer"
          >
            <div className="mr-2">
              <Avatar className="h-[50px] w-[50px]">
                {friend.user.avatar && (
                  <Image src={friend.user.avatar} alt={friend.user.firstName} />
                )}
              </Avatar>
            </div>
            <div>
              <Typography>
                {friend.user.firstName + " " + friend.user.lastName}
              </Typography>
              <Typography>{friend.user.email}</Typography>
            </div>
          </div>
        ))}
        <Typography>Pending Request</Typography>
        {pendingFriends.map((friend) => (
          <div
            onClick={() => router.push(`/user/${friend.user._id}`)}
            key={friend._id}
            className="flex w-full cursor-pointer"
          >
            <div className="mr-2">
              <Avatar className="h-[50px] w-[50px]">
                {friend.user.avatar && (
                  <Image src={friend.user.avatar} alt={friend.user.firstName} />
                )}
              </Avatar>
            </div>
            <div>
              <Typography>
                {friend.user.firstName + " " + friend.user.lastName}
              </Typography>
              <Typography>{friend.user.email}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
