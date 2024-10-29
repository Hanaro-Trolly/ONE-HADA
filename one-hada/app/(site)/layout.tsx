import Header from '@/components/layout/Header';
import AuthSession from '@/context/user/AuthSession';

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthSession>
        <div className='mx-auto w-full max-w-screen-md min-w-screen-80 min-h-screen flex flex-col bg-main-background '>
          <Header />
          <main className='pt-14'>{children}</main>
        </div>
      </AuthSession>
    </>
  );
}
