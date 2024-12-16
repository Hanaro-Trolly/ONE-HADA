'use client';

import PasswordKeypad from '@/components/ui/PasswordKeypad';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

export default function CheckPassword() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = session?.user.id;
  const accessToken = session?.accessToken;
  const route = searchParams.get('route');
  const [userPassword, setUserPassword] = useState<string>();

  const getUserPassword = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (data.code == 200 && data.status == 'OK') {
        setUserPassword(data.data.simplePassword);
      } else {
        console.log('비밀번호 조회 오류', data.code, data.status, data.message);
      }
    } catch (error) {
      console.error('Error fetching user password:', error);
    }
  }, [userId, accessToken]);

  useEffect(() => {
    getUserPassword();
  }, [getUserPassword]);

  const handleSubmit = (
    password: string[],
    setPassword: Dispatch<SetStateAction<string[]>>
  ) => {
    if (password.length !== 6) {
      alert('6자리 숫자를 모두 입력해주세요.');
      return;
    }

    console.log(userPassword, password);

    if (userPassword === password.join('')) {
      alert('인증에 성공하였습니다');
      router.push(`${route}`);
    } else {
      setPassword([]);
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className='py-8 px-10 w-full flex flex-col items-center justify-center'>
      <h2 className='text-xl font-medium text-[#635666] text-center mb-6'>
        간편 비밀번호를 입력하세요
      </h2>
      <PasswordKeypad handleSubmit={handleSubmit}></PasswordKeypad>
    </div>
  );
}
