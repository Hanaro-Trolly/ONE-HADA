'use client';

import PasswordKeypad from '@/components/ui/PasswordKeypad';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const thisRoute = searchParams.get('route');
  const { data: session } = useSession();

  const handleSubmit = async (password: string[]) => {
    if (password.length !== 6) {
      alert('6자리 숫자를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cert/password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: session?.user.provider,
            email: session?.user.email,
            password: password.join(''),
          }),
        }
      );

      const data = await response.json();

      if (data.code == 200 && data.status == 'OK') {
        alert('간편 비밀번호가 설정되었습니다.');
        if (thisRoute) {
          const route: string = '/';
          router.push(`${thisRoute}?route=${route}`);
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
