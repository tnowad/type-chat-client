"use client";
import friendApi from "@/apis/friend.api";
import SidebarItem from "@/components/widgets/SidebarItem";
import useAuth from "@/hooks/useAuth";
import { Friend } from "@/types/model";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
          <SidebarItem
            key={friend._id}
            title={friend.user.firstName + " " + friend.user.lastName}
            onClick={() => {
              router.push(`/user/${friend.user._id}`);
            }}
            thumbnail={friend.user.avatar}
            description={friend.user.email}
          />
        ))}
        <Typography>Pending Request</Typography>
        {pendingFriends.map((friend) => (
          <SidebarItem
            key={friend._id}
            title={friend.user.firstName + " " + friend.user.lastName}
            onClick={() => {
              router.push(`/user/${friend.user._id}`);
            }}
            thumbnail={friend.user.avatar}
            description={friend.user.email}
          />
        ))}
      </div>
    </div>
  );
}
