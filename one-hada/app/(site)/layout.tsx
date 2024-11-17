import Header from '@/components/layout/Header';
import AuthSession from '@/context/user/AuthSession';
import { WebSocketProvider } from '@/context/user/UserWebSocketContext';

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthSession>
        <WebSocketProvider>
          <div className='mx-auto w-full min-w-screen-80 min-h-screen flex flex-col bg-main-background'>
            <Header />
            <main className='pt-14'>{children}</main>
          </div>
        </WebSocketProvider>
      </AuthSession>
    </>
  );
}
