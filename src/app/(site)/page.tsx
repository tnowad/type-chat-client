import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Type Chat</h1>
      <p>
        <Link href={"/login"}>Login</Link>
      </p>
      <p>
        <Link href={"/register"}>Register</Link>
      </p>
    </main>
  );
}
