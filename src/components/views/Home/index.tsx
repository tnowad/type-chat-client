import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/assets/logo.png";
import { Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <main className="w-full flex justify-center items-center min-h-screen ">
      <div className="container p-8 flex flex-col justify-center items-center">
        <div className="flex items-center mb-8">
          <Image src={LogoImage} alt="Type Chat Logo" />
        </div>
        <Typography variant="h3" className="text-center">
          Welcome to{" "}
          <span className="text-blue-500 whitespace-nowrap">Type Chat</span>
        </Typography>
        <Typography variant="body1" className="text-gray-700 mb-8">
          Connect with others through the art of typing!
        </Typography>
        <div className="flex justify-center space-x-4">
          <Link href={"/login"}>
            <Button variant="outlined">Log In</Button>
          </Link>
          <Link href={"/register"}>
            <Button variant="outlined">Sign Up</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
