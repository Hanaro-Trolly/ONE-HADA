import Header from '@/components/layout/Header';

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto w-full max-w-screen-md min-w-screen-80 min-h-screen flex flex-col bg-main-background'>
      <Header />
      <main className='pt-14'>{children}</main>
    </div>
  );
}
