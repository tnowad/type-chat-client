import React from "react";
import Button from "@mui/material/Button";
import NextLink from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen w-full">
      <Button
        LinkComponent={NextLink}
        href={"/"}
        className="fixed top-4 left-4"
      >
        Back to Home
      </Button>
      {children}
    </section>
  );
}
