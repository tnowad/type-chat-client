"use client";
import Image from "next/image";
import { Typography, InputBase, Paper, Skeleton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { User } from "@/types/model";
import userApi from "@/apis/user.api";
import Link from "next/link";
export default function DiscoverySidebarPage() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await userApi.getAllUsers();
      if (users) {
        setUsers(users);
      }
    };
    fetchAllUsers();
  }, []);
  return (
    <div className="flex flex-col h-full p-2 gap-y-2">
      <Typography variant="h5">Discovery</Typography>
      <Paper
        variant="outlined"
        className="rounded-full mt-1 px-1 flex items-center"
      >
        <SearchIcon />
        <InputBase className="w-full" />
      </Paper>
      <div className="h-full w-full flex flex-col gap-y-2">
        {users.map((user) => (
          <Link
            href={`/user/${user._id}`}
            key={user._id}
            className="flex w-full"
          >
            <div className="mr-2">
              <Avatar className="h-[50px] w-[50px]">
                {user.thumbnail && (
                  <Image src={user.thumbnail} alt={user.firstName} />
                )}
              </Avatar>
            </div>
            <div>
              <Typography>{user.firstName + " " + user.lastName}</Typography>
              <Typography>{user.email}</Typography>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
