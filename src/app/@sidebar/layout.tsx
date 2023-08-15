"use client";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Typography } from "@mui/material";

import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { user } = useContext(AuthContext);

  const sideNavItems = [
    { icon: <ChatBubbleIcon />, text: "Chat", link: "/conversation" },
    { icon: <AlternateEmailIcon />, text: "Activity", link: "/activity" },
    { icon: <AccountBoxIcon />, text: "Profile", link: "/profile" },
    { icon: <SettingsIcon />, text: "Setting", link: "/setting" },
  ];

  const ignoreLayout = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify",
  ];

  if (
    ignoreLayout.includes(pathname) ||
    pathname.startsWith("/reset-password")
  ) {
    return null;
  }

  return (
    <div className="h-screen flex">
      <div
        className={classNames(
          "min-w-[4rem] border-r border-gray-200 flex flex-col justify-between transition-all",
          isSideNavOpen ? "w-[15rem]" : "w-[4rem]"
        )}
      >
        <div className="h-full">
          <ul className="mt-5 space-y-2">
            {sideNavItems.map((item, index) => (
              <li
                key={index}
                className={classNames(
                  "flex items-center p-2 hover:bg-slate-100 rounded transition-all text-gray-600",
                  {
                    "bg-slate-100": pathname == item.link,
                  }
                )}
              >
                <Link href={item.link} className="w-full">
                  <div className={"flex"}>
                    <div className="mx-3">{item.icon}</div>
                    {isSideNavOpen && (
                      <Typography className="ml-2">{item.text}</Typography>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={classNames(
            "flex w-full items-center p-3 gap-3 justify-between",
            {
              "flex-col": !isSideNavOpen,
            }
          )}
        >
          <div
            className={classNames(
              "flex items-center hover:bg-slate-50 rounded transition-all",
              {
                "justify-center": !isSideNavOpen,
              }
            )}
          >
            <Avatar className="mx-2 bg-slate-300" />
            {isSideNavOpen && <Typography>{user?.firstName}</Typography>}
          </div>
          <Avatar
            onClick={() => setIsSideNavOpen(!isSideNavOpen)}
            className="text-2xl bg-slate-300 text-white"
          >
            {isSideNavOpen ? (
              <MenuOpenIcon fontSize="inherit" />
            ) : (
              <MenuIcon fontSize="inherit" />
            )}
          </Avatar>
        </div>
      </div>
      <div className="min-w-[4rem] w-[22rem] border-r border-gray-200">
        {children}
      </div>
    </div>
  );
}
