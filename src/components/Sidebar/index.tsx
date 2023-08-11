"use client";
import classNames from "classnames";
import { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Typography } from "@mui/material";
export default function Sidebar() {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

  return (
    <div className="h-screen flex">
      <div
        className={classNames(
          "min-w-[4rem] border-r border-gray-200 flex flex-col justify-between transition-all",
          isSideNavOpen ? "w-[15rem]" : "w-[4rem]"
        )}
      >
        <div className="h-full">SideNav</div>
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
        <div>header</div>
        <div>Content</div>
      </div>
    </div>
  );
}
