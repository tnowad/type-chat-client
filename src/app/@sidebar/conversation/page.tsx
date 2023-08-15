"use client";
import Link from "next/link";
import { Typography, TextField, InputBase, Paper, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
export default function Page() {
  const [conversations, setConversations] = useState();

  return (
    <div className="flex flex-col p-2">
      <Typography variant="h5">Conversation</Typography>
      <Paper variant="outlined" className="rounded-full px-1 flex items-center">
        <SearchIcon />
        <InputBase className="w-full" />
      </Paper>
      <Box>
        <div>Conversation list</div>
      </Box>
    </div>
  );
}
