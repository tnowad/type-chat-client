export default function Conversation({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>Conversation from web with id: {id}</div>;
}
