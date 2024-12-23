'use client';

import { useFetch } from '@/hooks/useFetch';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Button } from '../ui/button';

export default function LoginButton() {
  const { data: session } = useSession();
  const { fetchData, error } = useFetch();

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = async () => {
    const response = await fetchData(`/api/cert/logout`, {
      method: 'POST',
      token: session?.accessToken,
    });

    if (response.code == 200) {
      signOut();
    } else {
      console.log('로그아웃 실패');
    }
  };

  useEffect(() => {
    if (error) {
      console.error('Fetch 에러 발생:', error);
    }
  }, [error]);

  return session?.isLogin ? (
    <div className='flex items-center space-x-4'>
      <Button
        id='headerButtonLogout'
        variant='ghost'
        className='rounded-none hover:bg-main-background'
        onClick={handleSignOut}
      >
        로그아웃
      </Button>
    </div>
  ) : (
    <Button
      id='headerButtonLogin'
      variant='ghost'
      className='rounded-none hover:bg-main-background'
      onClick={handleSignIn}
    >
      로그인
    </Button>
  );
}
