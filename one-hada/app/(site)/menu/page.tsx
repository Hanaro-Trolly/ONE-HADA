'use client';

import ButtonRow from '@/components/menu/ButtonRow';
import LoginStatus from '@/components/menu/LoginStatus';
import MenuCard from '@/components/menu/MenuCard';
import MenuSection from '@/components/menu/MenuSection';
import { Button } from '@/components/ui/button';
import { useFetch } from '@/hooks/useFetch';
import useScrollToTopButton from '@/hooks/useScrollToTopButton ';
import { ChevronUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { User } from '@/lib/datatypes';
import { buttons, menuData } from '@/lib/menuData';

export default function MenuPage() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const { fetchData } = useFetch<User>();
  const { fetchData: fetchHistory } = useFetch<History>();
  const router = useRouter();

  const saveHistory = useCallback(
    async (title: string, id: string) => {
      const response = await fetchHistory('/api/history', {
        method: 'POST',
        token: session?.accessToken,
        body: {
          historyName: `${title} 메뉴`,
          historyElements: {
            type: id,
          },
        },
      });

      if (response.code == 200) {
        console.log('활동내역 저장 성공');
      } else {
        console.error('활동내역 저장 실패');
      }
    },
    [fetchHistory, session?.accessToken]
  );

  const menuClickHandler = useCallback(
    (id: string, title: string, link: string) => {
      saveHistory(title, id);
      router.push(link);
    },
    [saveHistory, router]
  );

  useEffect(() => {
    const loadUser = async () => {
      if (session?.accessToken) {
        try {
          const response = await fetchData('/api/user', {
            method: 'GET',
            token: session.accessToken,
          });
          if (response.code === 200) {
            setUserProfile(response.data);
          }
        } catch (error) {
          console.error('유저 정보를 불러오는데 실패했습니다.', error);
        }
      }
    };
    loadUser();
  }, [fetchData, session?.accessToken]);

  const { isVisible, scrollToTop, scrollContainerRef } = useScrollToTopButton();

  return (
    <div
      ref={scrollContainerRef}
      className='w-full overflow-y-scroll max-h-[calc(100vh-60px)]'
    >
      <LoginStatus userProfile={userProfile} />
      <div className='my-2'>
        <ButtonRow buttons={buttons} />
      </div>
      <div className='mb-2 mx-6 px-5 pt-1 py-2'>
        {menuData.map((section) => (
          <MenuSection key={section.title} title={section.title}>
            {section.items.map((item) => (
              <MenuCard
                key={item.title}
                title={item.title}
                link={item.link}
                id={item.id}
                onClick={() => menuClickHandler(item.id, item.title, item.link)}
              />
            ))}
          </MenuSection>
        ))}
      </div>
      {isVisible && (
        <Button
          id='menuButtonScrollUp'
          variant='ghost'
          className='fixed z-50 bottom-4 right-2 p-2 [&_svg]:size-5'
          onClick={scrollToTop}
        >
          <ChevronUp className='text-[#377b68]' />
        </Button>
      )}
    </div>
  );
}
