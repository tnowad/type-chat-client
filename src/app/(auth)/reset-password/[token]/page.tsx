export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  return (
    <div>
      <h1>Reset Password</h1>
      <p>Token: {params.token}</p>
    </div>
  );
}
