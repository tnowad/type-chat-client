import "@/styles";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import favicon from "@/assets/favicon.ico";
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
