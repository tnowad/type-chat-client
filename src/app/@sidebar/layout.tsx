"use client";
import withAuth from "@/components/enhancers/withAuth";
import Sidebar from "@/components/widgets/Sidebar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { usePathname } from "next/navigation";

export default withAuth(function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sideNavItems = [
    { icon: <ChatBubbleIcon />, text: "Chat", link: "/conversation" },
    { icon: <AlternateEmailIcon />, text: "Activity", link: "/activity" },
    { icon: <TravelExploreIcon />, text: "Discovery", link: "/discovery" },
    { icon: <PeopleIcon />, text: "Friends", link: "/friends" },
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
});
