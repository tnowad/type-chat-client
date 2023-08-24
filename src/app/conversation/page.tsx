"use client";
import withAuth from "@/components/enhancers/withAuth";
import useAuth from "@/hooks/useAuth";

export default withAuth(function Conversation() {
  const {} = useAuth();
  return <div>Pick someone to start conversation</div>;
});
