export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <div className='flex w-[400px] flex-col'>{children}</div>
    </div>
  );
}
