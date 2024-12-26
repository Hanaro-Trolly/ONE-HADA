'use client';

import AutoMessageCarousel from '@/components/home/AutoRecommendCarousel';
import FavoriteCarousel from '@/components/home/FavoriteCarousel';
import NonLoginProductShowcase from '@/components/home/NonLoginProductShowcase';
import Modal from '@/components/layout/Modal';
import { Button } from '@/components/ui/button';
import { useFetch } from '@/hooks/useFetch';
import { signIn, useSession } from 'next-auth/react';
import { ScaleLoader } from 'react-spinners';
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
  const [isAgreeOpen, setIsAgreeOpen] = useState<boolean>(false);
  const [isConnectOpen, setIsConnectOpen] = useState<boolean>(false);

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
      window.dispatchEvent(
        new CustomEvent('consultationStateChange', {
          detail: { state: true },
        })
      );
    }
    setIsAgreeOpen(false);
    setIsConnectOpen(true);
  };

  const FavoriteSection = () => {
    const renderContent = () => {
      if (!session?.isLogin) {
        return (
          <Button
            variant='home'
            className='h-16 w-full mx-2 font-medium rounded-x bg-white hover:bg-[#F0F0F0] relative flex items-center'
            onClick={() => signIn()}
          >
            <div className='flex items-center w-full'>
              <div className='flex flex-col flex-grow justify-center text-center'>
                <p className='text-sm leading-tight'>자주 쓰는 기능을</p>
                <p className='text-sm leading-tight'>즐겨찾기로 등록해보세요</p>
              </div>
            </div>
          </Button>
        );
      }

      if (favoriteList.length === 0) {
        return (
          <Button
            variant='home'
            className='h-16 w-full mx-2 font-medium rounded-x bg-white hover:bg-[#F0F0F0] relative flex items-center'
            onClick={() => router.push('/settings/favorite')}
          >
            <div className='flex items-center w-full'>
              <div className='flex flex-col flex-grow justify-center text-center'>
                <p className='text-sm leading-tight'>자주 쓰는 기능을</p>
                <p className='text-sm leading-tight'>즐겨찾기로 등록해보세요</p>
              </div>
            </div>
          </Button>
        );
      }

      return (
        <FavoriteCarousel
          favoriteList={favoriteList}
          handleButtonClick={handleButtonClick}
        />
      );
    };

    return (
      <div>
        <div className='text-lg text-[#635666] flex gap-1 items-stretch mb-4 font-medium'>
          <p className='tossface-icon text-lg'>⭐</p> 즐겨찾기
        </div>
        <div className='flex justify-center'>
          <div className='h-16 w-full flex justify-between items-center'>
            {renderContent()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col justify-around pt-2 px-6'
    >
      <div className='h-[18%] pt-3 mb-2'>
        {session?.isLogin ? (
          <div>
            <span className='text-sm pl-3'>
              <span className='tossface-icon text-lg'>✨ </span>
              <span className='text-xl font-medium'>{userName} </span>
              님과 비슷한 사용자들의 선택!
            </span>
            <AutoMessageCarousel recommendProductList={recommendList} />
          </div>
        ) : (
          <div className='h-full w-full flex items-center'>
            <NonLoginProductShowcase />
          </div>
        )}
      </div>

      <div className='h-1/2 mb-2 flex flex-col'>
        <div className='w-full h-1/2 p-2'>
          <Button
            id='homeButtonActivity'
            onClick={() => routerPage('/activity')}
            className={`bg-[#D3EBCD] hover:bg-[#B8E3C7] ${buttonClassName}`}
          >
            <p className='tossface-icon text-4xl'>📥</p>내 활동 보기
          </Button>
        </div>
        <div className='flex h-1/2'>
          <div className='w-1/2 p-2'>
            <Button
              id='homeButtonCheck'
              onClick={() => routerPage('/check')}
              className={` bg-[#D2DAE0] hover:bg-[#AAB8C1] ${buttonClassName}`}
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

      <div className='h-1/4 px-2'>{<FavoriteSection />}</div>

      <footer>
        <div className='h-14 w-full pb-2'>
          <Link href='tel:010-2905-5905'>
            <Button
              id='homeButtonCall'
              variant='ghost'
              className='w-full h-full text-[#635666] text-xl'
              onClick={() => setIsAgreeOpen(true)}
            >
              <div className='tossface-icon'>📞</div>전화상담
            </Button>
          </Link>
        </div>
      </footer>

      {isAgreeOpen && (
        <Modal>
          <div className='text-center text-md'>
            <div className='flex flex-col space-y-2 my-4'>
              <p>전화 상담시 앱 사용 정보가</p>
              <p>상담원에게 전송됩니다.</p>
              <p>동의 하시겠습니까?</p>
            </div>
            <div className='flex justify-center space-x-4'>
              <Button className='bg-main-green' onClick={handleCallClick}>
                동의
              </Button>
              <Button
                className='bg-slate-500'
                onClick={() => setIsAgreeOpen(false)}
              >
                취소
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isConnectOpen && (
        <Modal>
          <div className='flex flex-col justify-around items-center'>
            <div>원활한 연결을 위해</div>
            <div className='my-2'>확인 버튼을 눌러주세요!</div>
            <ScaleLoader color='#61B89F' className='my-4'></ScaleLoader>
            <Button
              className='bg-main-green mt-2'
              onClick={() => setIsConnectOpen(false)}
            >
              확인
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
