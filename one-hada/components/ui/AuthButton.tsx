'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function AuthButton() {
  return (
    <div className='flex flex-col space-y-4 justify-center items-center '>
      <button
        onClick={() =>
          signIn('google', { callbackUrl: '/api/auth/checkLogin' })
        }
      >
        <Image
          src='/images/google_login.png'
          alt='googlelogin'
          width={250}
          height={200}
        ></Image>
      </button>
      <button
        onClick={() => signIn('kakao', { callbackUrl: '/api/auth/checkLogin' })}
      >
        <Image
          src='/images/kakao_login.png'
          alt='kakaologin'
          width={250}
          height={200}
        ></Image>
      </button>
      <button
        onClick={() => signIn('naver', { callbackUrl: '/api/auth/checkLogin' })}
      >
        <Image
          src='/images/naver_login.png'
          alt='naverlogin'
          width={250}
          height={200}
        ></Image>
      </button>
    </div>
  );
}
