"use client";
import useAuth from "@/hooks/useAuth";

export default function Conversation() {
  const {} = useAuth();
  return <div>Pick someone to start conversation</div>;
}
