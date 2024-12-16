'use client';

import PasswordKeypad from '@/components/ui/PasswordKeypad';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';

export default function CheckPassword() {
  const { data: session } = useSession();
  const { fetchData, error } = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const route = searchParams.get('route');

  const handleSubmit = async (
    password: string[],
    setPassword: Dispatch<SetStateAction<string[]>>
  ) => {
    if (password.length !== 6) {
      alert('6자리 숫자를 모두 입력해주세요.');
      return;
    }

    const response = await fetchData(`/api/cert/verify`, {
      method: 'POST',
      token: session?.accessToken,
      body: {
        simplePassword: password,
      },
    });

    if (response.code == 200) {
      alert('인증에 성공하였습니다');
      router.push(`${route}`);
    } else if (response.code == 401) {
      setPassword([]);
      alert('비밀번호가 일치하지 않습니다.');
    } else if (response.code == 404) {
      alert('사용자를 찾을 수 없습니다.');
    }
  };

  useEffect(() => {
    if (error) {
      console.error('Fetch 에러 발생:', error);
    }
  }, [error]);

  return (
    <div className='py-8 px-10 w-full flex flex-col items-center justify-center'>
      <h2 className='text-xl font-medium text-[#635666] text-center mb-6'>
        간편 비밀번호를 입력하세요
      </h2>
      <PasswordKeypad handleSubmit={handleSubmit}></PasswordKeypad>
    </div>
  );
}
