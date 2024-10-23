import { SessionProvider } from 'next-auth/react';
import localFont from 'next/font/local';
import './globals.css';

const scDreamFont = localFont({
  src: [
    { path: './fonts/S-Core_Dream/SCDream1.otf', weight: '100' },
    { path: './fonts/S-Core_Dream/SCDream2.otf', weight: '200' },
    { path: './fonts/S-Core_Dream/SCDream3.otf', weight: '300' },
    { path: './fonts/S-Core_Dream/SCDream4.otf', weight: '400' },
    { path: './fonts/S-Core_Dream/SCDream5.otf', weight: '500' },
    { path: './fonts/S-Core_Dream/SCDream6.otf', weight: '600' },
    { path: './fonts/S-Core_Dream/SCDream7.otf', weight: '700' },
    { path: './fonts/S-Core_Dream/SCDream8.otf', weight: '800' },
    { path: './fonts/S-Core_Dream/SCDream9.otf', weight: '900' },
  ],
  variable: '--font-dream',
});

export const metadata = {
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ONE-HADA',
  },
};

export const viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={`${scDreamFont.variable} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
