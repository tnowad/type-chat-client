"use client";
import withAuth from "@/components/enhancers/withAuth";

export default withAuth(function Conversation() {
  return (
    <div className="w-full flex justify-center items-center">
      <p className="text-5xl font-thin text-slate-400">
        Pick someone to start conversation
      </p>
    </div>
  );
});
