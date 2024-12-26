'use client';

import { Button } from '@/components/ui/button';
import { ScaleLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

export default function SocketTest() {
  const router = useRouter();

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col justify-center items-center space-y-10'
    >
      <div className='flex flex-col items-center text-lg'>
        <div>원활한 연결을 위해</div>
        <div className='my-2'>확인 버튼을 눌러주세요!</div>
      </div>
      <ScaleLoader color='#61B89F' className='my-4'></ScaleLoader>
      <Button
        className='bg-main-green mt-2 text-md px-4'
        onClick={() => router.push('/')}
      >
        확인
      </Button>
    </div>
  );
}
