interface UserPageProps {
  params: {
    id: string;
  };
}
export default function UserPage({ params }: UserPageProps) {
  const { id } = params;
  return <div>{id}</div>;
}
