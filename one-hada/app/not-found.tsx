'use client';

import { MoonLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4'>
      <div className='text-center space-y-4'>
        <div className='text-9xl flex items-center justify-center font-bold text-main-green gap-1'>
          4
          <MoonLoader color='#61B89F' size={60} speedMultiplier={0.5} />4
        </div>
        <div className='my-4 text-gray-600'>
          <div className='text-lg'>페이지를 찾을 수 없습니다.</div>
        </div>
        <div className='mt-8flex items-center justify-center gap-2'>
          <button
            onClick={() => router.back()}
            className='mx-2 rounded-md px-4 py-2 bg-main-green text-white hover:bg-[#479e86]'
          >
            이전 페이지
          </button>
          <button
            onClick={() => router.push('/')}
            className='mx-2 rounded-md px-4 py-2 bg-main-green text-white hover:bg-[#479e86]'
          >
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
}
