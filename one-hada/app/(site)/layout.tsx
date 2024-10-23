import Header from '@/components/layout/Header';

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto w-full max-w-mobile min-h-screen flex flex-col bg-main-background'>
      <Header />
      <main>{children}</main>
    </div>
  );
}
