'use client';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useSession } from 'next-auth/react';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getData, getDataByUserId } from '@/lib/api';
import { Shortcut, User } from '@/lib/datatypes';

export default function Home() {
  const [favoriteList, setFavoriteList] = useState<Shortcut[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user.id) {
          const userId = session?.user.id;
          const shortcuts = await getDataByUserId<Shortcut>('shortcut', userId);
          const userData = await getData<User>('user', userId);
          setFavoriteList(shortcuts.filter((item) => item.is_Favorite));
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col pt-2 px-6'
    >
      <div className='w-1/3 h-[12%] pt-3 px-2'>
        {session?.user ? (
          <div className='text-[#635666]'>
            <label className='text-xl font-medium text-[#698596]'>
              {user?.user_name}
            </label>{' '}
            님, <div>안녕하세요.</div>
          </div>
        ) : (
          <div className='text-[#635666]'>로그인 후 이용해주세요</div>
        )}
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
      <div className='h-1/4 p-2'>
        <div className='text-lg text-[#635666] flex gap-1 items-stretch mb-6 font-medium'>
          <FaStar className='text-yellow-400 text-2xl' /> 즐겨찾기
        </div>
        {session?.user ? (
          favoriteList.length > 0 ? (
            <div className='flex justify-center'>
              <Carousel
                opts={{ align: 'start', loop: true }}
                className='h-16 w-full flex justify-between items-center'
              >
                <CarouselPrevious
                  variant='ghost'
                  size='xl'
                  className='mb-[14px]'
                />
                <CarouselContent>
                  {favoriteList.map((item, idx) => (
                    <CarouselItem key={idx}>
                      <Link href={item.shortcutUrl}>
                        <Button
                          id={'favoriteBtn-' + item.id}
                          variant='home'
                          className='h-16 w-full bg-white  mx-2 font-medium rounded-xl hover:bg-[#F0F0F0]'
                        >
                          <label className=' overflow-ellipsis overflow-hidden whitespace-nowrap'>
                            {item.shortcut_name}
                          </label>
                        </Button>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext variant='ghost' size='xl' className='mb-[14px]' />
              </Carousel>
            </div>
          ) : (
            <div className='text-center'>즐겨찾기를 설정해주세요</div>
          )
        ) : (
          <div className='text-center'>로그인 후 이용해주세요</div>
        )}
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
              <div className='tossface-icon'>📞</div>전화상담
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
