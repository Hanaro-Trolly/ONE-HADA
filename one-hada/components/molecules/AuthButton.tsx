'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { setUser, removeUser } from '@/lib/auth';

export default function AuthButton() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
      console.log('로그인 성공:', session.user);
    }
  }, [session]);

  const handleSignIn = () => {
    signIn(); // NextAuth의 기본 로그인 페이지로 리다이렉트
  };

  const handleSignOut = () => {
    signOut();
    removeUser();
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return session ? (
    <div className='flex items-center space-x-4'>
      <button onClick={handleSignOut}>로그아웃</button>
    </div>
  ) : (
    <button onClick={handleSignIn}>로그인</button>
  );
}
