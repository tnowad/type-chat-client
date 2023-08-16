import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  return <ResetPasswordForm token={token} />;
}
