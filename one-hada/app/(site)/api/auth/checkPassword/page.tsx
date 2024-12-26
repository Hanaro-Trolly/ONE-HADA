'use client';

import PasswordKeypad from '@/components/ui/PasswordKeypad';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

export default function CheckPassword() {
  const { data: session, update } = useSession();
  const { fetchData, error } = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const route = searchParams.get('route');
  const newAccessToken = searchParams.get('newAccessToken');
  const newRefreshToken = searchParams.get('newRefreshToken');

  const handleSubmit = useCallback(
    async (
      password: string[],
      setPassword: Dispatch<SetStateAction<string[]>>
    ) => {
      if (password.length !== 6) {
        alert('6자리 숫자를 모두 입력해주세요.');
        return;
      }
      console.log('Tokens:', newAccessToken, newRefreshToken);

      try {
        const response = await fetchData(`/api/cert/verify`, {
          method: 'POST',
          token: newAccessToken || session?.accessToken,
          body: {
            simplePassword: password.join('').toString(),
          },
        });

        if (response.code == 200 && response.status == 'OK' && route) {
          alert('인증에 성공하였습니다');
          if (newAccessToken && newRefreshToken) {
            await update({
              id: session?.user.id,
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
              isLogin: true,
            });
            router.back();
          } else {
            router.push(route);
          }
        } else if (response.code == 200 && response.status == 'UNAUTHORIZED') {
          setPassword([]);
          alert('비밀번호가 일치하지 않습니다.');
        } else if (response.code == 404) {
          alert('사용자를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('Error during verification:', error);
        alert('인증 중 오류가 발생했습니다.');
      }
    },
    [fetchData, newAccessToken, newRefreshToken, route, router, session, update]
  );

  useEffect(() => {
    if (error) {
      console.error('Fetch 에러 발생:', error);
    }
  }, [error]);

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='py-8 px-10 w-full flex flex-col items-center justify-center'
    >
      <h2 className='text-xl font-medium text-[#635666] text-center mb-6'>
        간편 비밀번호를 입력하세요
      </h2>
      <PasswordKeypad handleSubmit={handleSubmit}></PasswordKeypad>
    </div>
  );
}
