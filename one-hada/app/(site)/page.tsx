'use client';

import AutoMessageCarousel from '@/components/home/AutoRecommendCarousel';
import FavoriteCarousel from '@/components/home/FavoriteCarousel';
import LinkButton from '@/components/home/LinkButton';
import { Button } from '@/components/ui/button';
import { useFetch } from '@/hooks/useFetch';
import { useSession } from 'next-auth/react';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Shortcut, User } from '@/lib/datatypes';

const buttonStyles = {
  activity: 'bg-[#D2DAE0] hover:bg-[#AAB8C1]',
  inquiry: 'bg-[#D3EBCD] hover:bg-[#B8E3C7]',
  transfer: 'bg-[#AEDBCE] hover:bg-[#8CCFC2]',
};

export default function Home() {
  const [favoriteList, setFavoriteList] = useState<Shortcut[]>([]);
  const { data: session } = useSession();
  const { fetchData: fetchUser, error: userError } = useFetch<User>();
  const { fetchData: fetchFavorite, error: favoriteError } =
    useFetch<Shortcut>();
  const [userName, setUserName] = useState<string>('');

  const getUserName = useCallback(async () => {
    const response = await fetchUser(`/api/users/51`, {
      method: 'GET',
      token: session?.accessToken,
    });

    if (response.code == 200) {
      setUserName(response.data.userName);
    }
  }, [fetchUser, session?.accessToken]);

  const getFavoriteList = useCallback(async () => {
    const response = await fetchFavorite(`/api/shortcut/favorite`, {
      method: 'GET',
      token: session?.accessToken,
    });
    setFavoriteList(response.data.shortcuts);
  }, [fetchFavorite, session?.accessToken]);

  useEffect(() => {
    if (session?.accessToken) {
      getUserName();
      getFavoriteList();
    }
  }, [getFavoriteList, getUserName, session?.accessToken]);

  useEffect(() => {
    if (userError) {
      console.error('userFetch 에러 발생:', userError);
    }
    if (favoriteError) {
      console.error('favoriteFetch 에러 발생:', favoriteError);
    }
  }, [userError, favoriteError]);

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
      <div className='w-full h-[18%] pt-3'>
        {session?.user ? (
          <div>
            <span className='text-sm pl-3'>
              <span className='tossface-icon text-lg'>✨{userName} </span> 님을
              위한 추천!{' '}
            </span>
            <div className='flex items-center gap-1 bg-gray-200 rounded-md mx-2 justify-center mb-2'>
              <AutoMessageCarousel />
            </div>
          </div>
        ) : (
          <div>로그인 후 이용해주세요</div>
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
        {session?.user ? (
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
