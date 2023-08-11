"use client";
import classNames from "classnames";
import { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Typography } from "@mui/material";

import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Link from "next/link";
export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

  const sideNavItems = [
    { icon: <ChatBubbleIcon />, text: "Friends", link: "/conversation" },
    { icon: <SwitchAccountIcon />, text: "Activity", link: "/setting" },
  ];

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
                  "flex items-center p-2 hover:bg-slate-100 rounded transition-all",
                  {
                    "bg-slate-100": location.pathname === item.link,
                  }
                )}
              >
                <Link href={item.link}>
                  <div className="flex">
                    <div>{item.icon}</div>
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
          className={classNames("flex w-full items-center p-3 gap-3", {
            "flex-col": !isSideNavOpen,
          })}
        >
          <div
            className={classNames(
              "flex items-center hover:bg-slate-50 rounded transition-all",
              {
                "justify-center": !isSideNavOpen,
              }
            )}
          >
            <Avatar className="mx-2" />
            {isSideNavOpen && <Typography>Nguyen Minh Tuan</Typography>}
          </div>
          <Avatar
            onClick={() => setIsSideNavOpen(!isSideNavOpen)}
            className="text-2xl bg-slate-100 text-black"
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
