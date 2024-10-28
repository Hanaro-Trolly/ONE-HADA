'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { fetchAllData } from '@/lib/api';
import { User } from '@/lib/datatypes';
import { Button } from '../ui/button';

export default function LoginButton() {
  const { data: session, status, update } = useSession();

  const fetchUser = useCallback(async () => {
    try {
      const userData = await fetchAllData<User>('user');
      const provider = `user_${session?.user?.provider}` as keyof User;
      const foundUser = userData.find(
        (user) => user[provider] === session?.user.id
      );
      if (foundUser) {
        await update({ id: foundUser.id });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [session, update]);

  useEffect(() => {
    if (session) {
      fetchUser();
      console.log('로그인성공', session);
    }
  }, [session, fetchUser]);

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
