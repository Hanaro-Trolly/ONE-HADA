import Header from '@/components/layout/Header';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export const metadata = {
  title: 'ONE-HADA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          <Header />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
