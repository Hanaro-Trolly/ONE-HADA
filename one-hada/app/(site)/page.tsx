import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div
        style={{ height: 'calc(100vh - 56px)' }}
        className='flex flex-col pt-2 px-6 '
      >
        <div className='w-1/3 h-[14%] mb-4 pt-3'>
          <div className='text=[#635666}'>
            <label className='text-xl text-[#698596]'>강민관</label>님,{' '}
          </div>
          안녕하세요.
        </div>
        <div className='h-1/2 mb-4 flex flex-col'>
          <div className='w-full h-1/2 p-2'>
            <Link href='/activity'>
              <Button className='w-full h-full bg-[#D2DAE0] text-[#635666] text-lg'>
                내 활동보기
              </Button>
            </Link>
          </div>
          <div className='flex h-1/2'>
            <div className='w-1/2 p-2'>
              <Link href='/check'>
                <Button className='w-full h-full bg-[#D3EBCD] text-[#635666] text-lg'>
                  조회하기
                </Button>
              </Link>
            </div>
            <div className='w-1/2 p-2'>
              <Link href='/transfer'>
                <Button className='w-full h-full bg-[#AEDBCE] text-[#635666] text-lg'>
                  이체하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className='h-1/4 bg-slate-200 mb-2'>즐겨찾기</div>
        <div className='flex-grow'></div>
        <footer>
          <div className='h-14 w-ful'>
            <Button
              variant='ghost'
              className='w-full h-full text-[#635666] text-lg'
            >
              전화하기
            </Button>
          </div>
        </footer>
      </div>
    </>
  );
}
