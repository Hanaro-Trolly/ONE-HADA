'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function checkLogin() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      console.log('User', session.user);
      if (session.user.isNewUser) {
        router.push('/api/auth/register');
      } else {
        router.push('/');
      }
    }
  }, [session, router]);

  return (
    <>
      <div>로그인 중입니다.</div>
    </>
  );
}
