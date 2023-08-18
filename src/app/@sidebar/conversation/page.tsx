"use client";
import Link from "next/link";
import {
  Typography,
  TextField,
  InputBase,
  Paper,
  Box,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
export default function Page() {
  const [conversations, setConversations] = useState();

  return (
    <div className="flex flex-col h-full p-2 gap-y-2">
      <Typography variant="h5">Conversation</Typography>
      <Paper
        variant="outlined"
        className="rounded-full mt-1 px-1 flex items-center"
      >
        <SearchIcon />
        <InputBase className="w-full" />
      </Paper>
      <div className="h-full w-full flex flex-col gap-y-2">
        <div className="flex w-full ">
          <div className="mr-2">
            <Skeleton variant="circular" width={50} height={50} />
          </div>
          <div>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={250} />
          </div>
        </div>
      </div>
    </div>
  );
}
