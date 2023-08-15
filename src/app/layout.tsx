import "@/styles";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import favicon from "@/assets/favicon.ico";
import classnames from "classnames";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Type Chat",
  description:
    "Elevate your online conversations with Type Chat's seamless experience.",
  icons: favicon.src,
};

export default function RootLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className={classnames(inter.className, "h-screen")}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex">
          <AuthProvider>
            {sidebar}
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
