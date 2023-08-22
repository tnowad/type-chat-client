"use client";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SettingsIcon from "@mui/icons-material/Settings";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/widgets/Sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sideNavItems = [
    { icon: <ChatBubbleIcon />, text: "Chat", link: "/conversation" },
    { icon: <AlternateEmailIcon />, text: "Activity", link: "/activity" },
    { icon: <TravelExploreIcon />, text: "Discovery", link: "/discovery" },
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

  return <Sidebar sideNavItems={sideNavItems}>{children}</Sidebar>;
}
