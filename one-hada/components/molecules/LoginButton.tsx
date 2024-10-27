'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '../ui/button';

export default function LoginButton() {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return session ? (
    <div className='flex items-center space-x-4'>
      <Button
        id='lo'
        variant='ghost'
        className='rounded-none hover:bg-main-background'
        onClick={handleSignOut}
      >
        로그아웃
      </Button>
    </div>
  ) : (
    <Button
      id='li'
      variant='ghost'
      className='rounded-none hover:bg-main-background'
      onClick={handleSignIn}
    >
      로그인
    </Button>
  );
}
