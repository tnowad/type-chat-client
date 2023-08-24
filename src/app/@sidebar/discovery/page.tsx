"use client";
import userApi from "@/apis/user.api";
import SidebarItem from "@/components/widgets/SidebarItem";
import { User } from "@/types/model";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function DiscoverySidebarPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
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
          <SidebarItem
            key={user._id}
            title={user.firstName + " " + user.lastName}
            onClick={() => {
              router.push(`/user/${user._id}`);
            }}
            description={user.email}
          />
        ))}
      </div>
    </div>
  );
}
