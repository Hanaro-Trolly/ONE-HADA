'use client';

import FavoriteCarousel from '@/components/home/FavoriteCarousel';
import LinkButton from '@/components/home/LinkButton';
import { Button } from '@/components/ui/button';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Shortcut, User } from '@/lib/datatypes';

const buttonStyles = {
  activity: 'bg-[#D2DAE0] hover:bg-[#AAB8C1]',
  inquiry: 'bg-[#D3EBCD] hover:bg-[#B8E3C7]',
  transfer: 'bg-[#AEDBCE] hover:bg-[#8CCFC2]',
};

export default function Home() {
  const [favoriteList, setFavoriteList] = useState<Shortcut[]>([]);
  const { data: session } = useSession();
  const { fetchData, error } = useFetch<User>();
  const [userName, setUserName] = useState<string>('');

  const getFavoriteList = () => {
    setFavoriteList([]);
  };

  useEffect(() => {
    const getUserName = async () => {
      if (!session?.user.id) return;

      const response = await fetchData(`/api/user`, {
        method: 'GET',
        token: session?.accessToken,
      });

      if (response.code == 200) {
        setUserName(response.data.userName);
      }
    };

    getUserName();
    getFavoriteList();
  }, [session?.user.id, fetchData, session?.accessToken]);

  useEffect(() => {
    if (error) {
      console.error('Fetch 에러 발생:', error);
    }
  }, [error]);

  const handleCallClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('consultationState', 'true');
      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col pt-2 px-6'
    >
      <div className='w-1/3 h-[12%] pt-3 px-2'>
        {session?.isLogin ? (
          <div className='text-[#635666]'>
            <label className='text-xl font-medium text-[#698596]'>
              {userName}
            </label>{' '}
            님, <div>안녕하세요.</div>
          </div>
        ) : (
          <div className='text-[#635666]'>로그인 후 이용해주세요</div>
        )}
      </div>

      <div className='h-1/2 mb-4 flex flex-col'>
        <div className='w-full h-1/2 p-2'>
          <LinkButton
            id='activityBtn'
            href='/activity'
            text='내 활동 보기'
            icon='📥'
            style={buttonStyles.activity}
          />
        </div>
        <div className='flex h-1/2'>
          <div className='w-1/2 p-2'>
            <LinkButton
              id='checkBtn'
              href='/check'
              text='조회하기'
              icon='💰'
              style={buttonStyles.inquiry}
            />
          </div>
          <div className='w-1/2 p-2'>
            <LinkButton
              id='transferBtn'
              href='/transfer/my'
              text='이체하기'
              icon='💸'
              style={buttonStyles.transfer}
            />
          </div>
        </div>
      </div>

      <div className='h-1/4 p-2'>
        <div className='text-lg text-[#635666] flex gap-1 items-stretch mb-6 font-medium'>
          <FaStar className='text-yellow-400 text-2xl' /> 즐겨찾기
        </div>
        {session?.isLogin ? (
          favoriteList.length > 0 ? (
            <FavoriteCarousel favoriteList={favoriteList} />
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
          <Link href='tel:010-2905-5905'>
            <Button
              id='callBtn'
              variant='ghost'
              className='w-full h-full text-[#635666] text-xl'
              onClick={handleCallClick}
            >
              <div className='tossface-icon'>📞</div>전화상담
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
