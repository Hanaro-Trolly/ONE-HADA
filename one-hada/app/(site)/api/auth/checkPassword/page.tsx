'use client';

import PasswordKeypad from '@/components/ui/PasswordKeypad';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getData } from '@/lib/api';
import { User } from '@/lib/datatypes';

export default function CheckPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const route = searchParams.get('route');
  const [userPassword, setUserPassword] = useState<string[] | null>(null);

  const getUserPassword = async () => {
    try {
      if (userId) {
        const userData = await getData<User>('user', userId);
        if (userData?.simple_password !== undefined) {
          setUserPassword(userData?.simple_password);
        } else {
          setUserPassword(null);
        }
      }
    } catch (error) {
      console.error('Error fetching user password:', error);
    }
  };

  useEffect(() => {
    getUserPassword();
  }, [userId]);

  const handleSubmit = (password: string[]) => {
    if (password.length !== 6) {
      alert('6자리 숫자를 모두 입력해주세요.');
      return;
    }

    if (userPassword?.join('') === password.join('')) {
      alert('인증에 성공하였습니다');
      router.push(`${route}`);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className='py-8 px-10 w-full flex flex-col items-center justify-center'>
      <h2 className='text-xl font-medium text-[#635666] text-center mb-6'>
        간편 비밀번호를 입력하세요
      </h2>
      <PasswordKeypad hadleSubmit={handleSubmit}></PasswordKeypad>
    </div>
  );
}
