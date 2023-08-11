import "@/styles";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import favicon from "@/assets/favicon.ico";
import Sidebar from "@/components/Sidebar";
import classnames from "classnames";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Type Chat",
  description:
    "Elevate your online conversations with Type Chat's seamless experience.",
  icons: favicon.src,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className={classnames(inter.className, "h-screen ")}>
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
