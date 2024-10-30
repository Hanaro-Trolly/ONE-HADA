'use client';

import PasswordKeypad from '@/components/ui/PasswordKeypad';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getData, updateData } from '@/lib/api';
import { User } from '@/lib/datatypes';

export default function SetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const thisRoute = searchParams.get('route');
  const [userData, setUserData] = useState<User>();

  const getUserData = useCallback(async () => {
    try {
      if (userId) {
        const data = await getData<User>('user', userId);
        if (data) {
          setUserData(data);
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, [userId]);

  useEffect(() => {
    getUserData();
  }, [userId, getUserData]);

  const handleSubmit = async (password: string[]) => {
    if (password.length !== 6) {
      alert('6자리 숫자를 모두 입력해주세요.');
      return;
    }

    try {
      if (userId && userData) {
        // 비밀번호 업데이트
        await updateData<User>('user', userId, {
          ...userData,
          simple_password: password,
        });

        alert('간편 비밀번호가 설정되었습니다.');

        if (thisRoute) {
          const route: string = '/';
          router.push(`${thisRoute}?userId=${userId}&route=${route}`);
        }
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('비밀번호 설정에 실패했습니다.');
    }
  };

  return (
    <div className='py-8 px-10 w-full flex flex-col items-center justify-center'>
      <h2 className='text-xl font-medium text-[#635666] text-center mb-6'>
        간편 비밀번호를 설정하세요
      </h2>
      <PasswordKeypad handleSubmit={handleSubmit}></PasswordKeypad>
    </div>
  );
}
