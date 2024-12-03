// app/context/user/AuthSession.tsx
'use client';

import { SessionProvider } from 'next-auth/react';

// app/context/user/AuthSession.tsx

type Props = {
  children: React.ReactNode;
};

export default function AuthSession({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
