'use client';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getData, getDataByUserId } from '@/lib/api';
import { Shortcut, User } from '@/lib/datatypes';

export default function Home() {
  const [favoriteList, setFavoriteList] = useState<Shortcut[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = '1';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shortcuts = await getDataByUserId<Shortcut>('shortcut', userId);
        const userData = await getData<User>('user', userId);
        setFavoriteList(shortcuts.filter((item) => item.is_Favorite));
        setUser(userData);
      } catch (error) {
        setError('데이터를 불러오는 데 문제가 발생했습니다.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col pt-2 px-6'
    >
      <div className='w-1/3 h-[12%] pt-3 px-2'>
        <div className='text-[#635666]'>
          <label className='text-xl font-medium text-[#698596]'>
            {user?.user_name}
          </label>{' '}
          님,
        </div>
        안녕하세요.
      </div>
      <div className='h-1/2 mb-4 flex flex-col'>
        <div className='w-full h-1/2 p-2'>
          <Link href='/activity'>
            <Button
              id='activityBtn'
              variant='home'
              className='w-full h-full bg-[#D2DAE0] hover:bg-[#AAB8C1]'
            >
              <div className='tossface-icon text-[2rem]'>📥</div>내 활동 보기
            </Button>
          </Link>
        </div>
        <div className='flex h-1/2'>
          <div className='w-1/2 p-2'>
            <Link href='/check'>
              <Button
                id='inquiryBtn'
                variant='home'
                className='w-full h-full bg-[#D3EBCD] hover:bg-[#B8E3C7]'
              >
                <div className='flex flex-col justify-center gap-3 items-center pt-6'>
                  <div className='tossface-icon text-[3rem]'>💰</div>
                  조회하기
                </div>
              </Button>
            </Link>
          </div>
          <div className='w-1/2 p-2'>
            <Link href='/transfer/my'>
              <Button
                id='transferBtn'
                variant='home'
                className='w-full h-full bg-[#AEDBCE] hover:bg-[#8CCFC2]'
              >
                <div className='flex flex-col justify-center gap-3 items-center pt-6'>
                  <div className='tossface-icon text-[3rem]'>💸</div>
                  이체하기
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className='h-1/4 mb-2 p-2'>
        <div className='text-lg text-[#635666] flex gap-1 items-stretch mb-4 font-medium'>
          <FaStar className='text-yellow-400 text-2xl' /> 즐겨찾기
        </div>
        <div className='flex justify-center text-black'>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className='h-16 mx-8 w-full'
          >
            <CarouselContent>
              {favoriteList.map((item, idx) => (
                <CarouselItem key={idx}>
                  <Button
                    id={'favoriteBtn-' + item.id}
                    variant='home'
                    className='h-16 w-full bg-white text-black mx-2 font-medium rounded-xl hover:bg-[#F0F0F0]'
                  >
                    {item.shortcut_name}
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant='ghost' size='xl' />
            <CarouselNext variant='ghost' size='xl' />
          </Carousel>
        </div>
      </div>
      <div className='flex-grow'></div>
      <footer>
        <div className='h-14 w-full'>
          <Link href='tel:010-9178-8484'>
            <Button
              id='callBtn'
              variant='ghost'
              className='w-full h-full text-[#635666] text-xl'
            >
              전화상담
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
