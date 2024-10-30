'use client';

import ButtonRow from '@/components/menu/ButtonRow';
import MenuCard from '@/components/menu/MenuCard';
import MenuSection from '@/components/menu/MenuSection';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon, ChevronUp } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { getData } from '@/lib/api';
import { User } from '@/lib/datatypes';
import { buttons, menuData } from '@/lib/menuData';

export default function MenuPage() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (session?.user) {
          const data = await getData<User>('user', session.user.id);
          if (data) {
            setUserProfile(data);
          }
        }
      } catch (error) {
        console.error('유저 정보를 불러오는데 실패했습니다.', error);
      }
    };
    loadUser();
  }, [session]);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const toggleVisibility = () => {
      if (container.scrollTop > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    container.addEventListener('scroll', toggleVisibility);
    return () => {
      container.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={scrollContainerRef}
      style={{ maxHeight: 'calc(100vh - 60px)' }}
      className='w-full overflow-y-scroll'
    >
      {session?.user ? (
        <div className='bg-[#DCEFEA] flex items-center'>
          <div className='mx-6 px-5 h-14 w-full flex justify-between items-center'>
            <div className='text=[#635666}'>
              <label className='text-xl text-[#698596] font-semibold'>
                {userProfile?.user_name}
              </label>
              님{' '}
            </div>
            <div className='flex items-center h-5 text-gray-500'>
              <Button
                variant='ghost'
                className='px-0 py-0 gap-0 font-normal'
                onClick={() => {
                  signOut();
                }}
              >
                로그아웃
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-[#DCEFEA] flex items-center'>
          <div className='mx-6 px-5 h-14 w-full flex justify-between items-center'>
            로그인을 해주세요.
            <div className='flex items-center h-5 text-gray-500'>
              <Button
                variant='ghost'
                className='px-0 py-0 gap-0 font-normal'
                onClick={() => {
                  signIn();
                }}
              >
                로그인
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className='my-2'>
        <ButtonRow buttons={buttons}></ButtonRow>
      </div>
      <div className='mb-2 mx-6 px-5 pt-1 py-2'>
        {menuData.map((section) => (
          <MenuSection key={section.title} title={section.title}>
            {section.items.map((item) => (
              <MenuCard key={item.title} title={item.title} link={item.link} />
            ))}
          </MenuSection>
        ))}
      </div>
      <div className='z-50'>
        {isVisible && (
          <Button
            id='1'
            variant='ghost'
            className='fixed z-50 bottom-4 right-2 p-2 [&_svg]:size-5 '
            onClick={scrollToTop}
          >
            <ChevronUp className='text-[#377b68]' />
          </Button>
        )}
      </div>
    </div>
  );
}
