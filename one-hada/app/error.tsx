'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4'>
      <div className='text-center'>
        <div className='animate-error-icon tossface-icon text-7xl font-bold mb-8'>
          ⚠️
        </div>
        <p className='text-lg text-gray-600 mb-8'>
          예기치 않은 오류가 발생했습니다.
        </p>
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={reset}
            className='mx-2 rounded-md px-4 py-2 bg-main-green text-white hover:bg-[#479e86]'
          >
            다시 시도하기
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className='mx-2 rounded-md px-4 py-2 bg-main-green text-white hover:bg-[#479e86]'
          >
            홈으로 가기
          </button>
        </div>
        <button
          onClick={() => signOut()}
          className='mx-2 rounded-md px-4 py-2 bg-main-green text-white hover:bg-[#479e86]'
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
