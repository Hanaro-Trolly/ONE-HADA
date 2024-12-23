'use client';

import AutoMessageCarousel from '@/components/home/AutoRecommendCarousel';
import FavoriteCarousel from '@/components/home/FavoriteCarousel';
import { Button } from '@/components/ui/button';
import { useFetch } from '@/hooks/useFetch';
import { signIn, useSession } from 'next-auth/react';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import JSONtoUrl from '@/lib/JSONtoUrl';
import { HistoryElementType, Shortcut, User } from '@/lib/datatypes';
import { handleShortcutClick } from '@/lib/shortcutUtils';

type Recommend = {
  name: string;
};

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [favoriteList, setFavoriteList] = useState<Shortcut[]>([]);

  const [recommendList, setRecommendList] = useState<string[]>([]);
  const { fetchData } = useFetch();
  const { fetchData: fetchUser, error: userError } = useFetch<User>();
  const { fetchData: fetchFavorite, error: favoriteError } =
    useFetch<Shortcut>();
  const { fetchData: fetchRecommend, error: recommendError } =
    useFetch<Recommend[]>();

  const buttonClassName = 'w-full h-full text-[#635666] text-lg flex flex-col';

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) return;

      try {
        const userResponse = await fetchUser(`/api/user`, {
          method: 'GET',
          token: session?.accessToken,
        });

        if (userResponse.code == 200) {
          setUserName(userResponse.data.userName);
        }

        const favoriteResponse = await fetchFavorite(`/api/shortcut/favorite`, {
          method: 'GET',
          token: session?.accessToken,
        });
        setFavoriteList(favoriteResponse.data.shortcuts);

        const recommendResponse = await fetchRecommend(
          `/api/product/recommend`,
          {
            method: 'GET',
            token: session?.accessToken,
          }
        );
        setRecommendList(
          recommendResponse.data.map(({ name }: { name: string }) => name)
        );
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [fetchUser, fetchFavorite, fetchRecommend, session?.accessToken]);

  useEffect(() => {
    if (userError) {
      console.error('userFetch 에러 발생:', userError);
    }
    if (favoriteError) {
      console.error('favoriteFetch 에러 발생:', favoriteError);
    }
    if (recommendError) {
      console.error('recommendFetch 에러 발생:', recommendError);
    }
  }, [userError, favoriteError, recommendError]);

  const routerPage = (url: string) => {
    if (session?.isLogin) {
      router.push(url);
    } else {
      signIn();
    }
  };

  const handleButtonClick = async (shortcutElements: HistoryElementType) => {
    const success = await handleShortcutClick(
      shortcutElements,
      fetchData,
      session?.accessToken
    );
    if (success) {
      router.push(JSONtoUrl(shortcutElements));
    }
  };

  const handleCallClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('consultationState', 'true');
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(
        new CustomEvent('consultationStateChange', {
          detail: { state: true },
        })
      );
    }
  };

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col pt-2 px-6'
    >
      <div className='h-[18%] pt-3 mb-2'>
        {session?.isLogin ? (
          <div>
            <span className='text-sm pl-3'>
              <span className='tossface-icon text-lg'>✨</span>
              <span className='text-lg'>{userName} </span>
              님을 위한 추천!{' '}
            </span>
            <div>
              <AutoMessageCarousel recommendProductList={recommendList} />
            </div>
          </div>
        ) : (
          <div className='h-full flex items-center justify-center'>
            <div className='text-center'>로그인 후 이용해주세요</div>
          </div>
        )}
      </div>

      <div className='h-1/2 mb-4 flex flex-col'>
        <div className='w-full h-1/2 p-2'>
          <Button
            id='homeButtonActivity'
            onClick={() => routerPage('/activity')}
            className={`bg-[#D2DAE0] hover:bg-[#AAB8C1] ${buttonClassName}`}
          >
            <p className='tossface-icon text-4xl'>📥</p>내 활동 보기
          </Button>
        </div>
        <div className='flex h-1/2'>
          <div className='w-1/2 p-2'>
            <Button
              id='homeButtonCheck'
              onClick={() => routerPage('/check')}
              className={`bg-[#D3EBCD] hover:bg-[#B8E3C7] ${buttonClassName}`}
            >
              <p className='tossface-icon text-4xl'>💰</p>조회하기
            </Button>
          </div>
          <div className='w-1/2 p-2'>
            <Button
              id='homeButtonTransfer'
              onClick={() => routerPage('/transfer/my')}
              className={`bg-[#AEDBCE] hover:bg-[#8CCFC2] ${buttonClassName}`}
            >
              <p className='tossface-icon text-4xl'>💸</p>이체하기
            </Button>
          </div>
        </div>
      </div>

      <div className='h-1/4 p-2'>
        <div className='text-lg text-[#635666] flex gap-1 items-stretch mb-6 font-medium'>
          <FaStar className='text-yellow-400 text-2xl' /> 즐겨찾기
        </div>
        {session?.isLogin ? (
          favoriteList.length > 0 ? (
            <FavoriteCarousel
              favoriteList={favoriteList}
              handleButtonClick={handleButtonClick}
            />
          ) : (
            <div className='text-center'>즐겨찾기를 설정해주세요</div>
          )
        ) : (
          <div className='text-center'>로그인 후 이용해주세요</div>
        )}
      </div>

      <div className='flex-grow'></div>
      <footer>
        <div className='h-14 w-full pb-2'>
          <Link href='tel:010-2905-5905'>
            <Button
              id='homeButtonCall'
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
