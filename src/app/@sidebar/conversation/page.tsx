import Link from "next/link";

export default function Page() {
  return (
    <div>
      List friend
      <ul>
        <Link href={"/conversation/1"}>Conversation 1</Link>
        <Link href={"/conversation/2"}>Conversation 1</Link>
        <Link href={"/conversation/3"}>Conversation 1</Link>
        <Link href={"/conversation/4"}>Conversation 1</Link>
        <Link href={"/conversation/5"}>Conversation 1</Link>
      </ul>
    </div>
  );
}
