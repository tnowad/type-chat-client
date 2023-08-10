export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>AuthLayout</div>
      {children}
    </section>
  );
}
