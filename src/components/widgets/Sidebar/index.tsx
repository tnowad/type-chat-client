"use client";
import classNames from "classnames";
import { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Typography } from "@mui/material";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface SidebarProps {
  sideNavItems: {
    icon: React.ReactNode;
    text: string;
    link: string;
  }[];
  children: React.ReactNode;
}

export default function Sidebar({ sideNavItems, children }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const toggleSideNav = () => setIsSideNavOpen((value) => !value);

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
                <Link href={item.link} passHref>
                  <span className="w-full flex">
                    <div className="mx-3">{item.icon}</div>
                    {isSideNavOpen && (
                      <Typography className="ml-2">{item.text}</Typography>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={classNames(
            "flex w-full items-center p-3 gap-3 justify-between",
            { "flex-col": !isSideNavOpen }
          )}
        >
          <div
            className={classNames(
              "flex items-center hover:bg-slate-50 rounded transition-all",
              { "justify-center": !isSideNavOpen }
            )}
          >
            <Avatar className="mx-2 bg-slate-300" />
            {isSideNavOpen && <Typography>{user?.firstName}</Typography>}
          </div>
          <Avatar
            onClick={toggleSideNav}
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
