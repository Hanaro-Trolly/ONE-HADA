'use client';

import ButtonRow from '@/components/menu/ButtonRow';
import MenuCard from '@/components/menu/MenuCard';
import MenuSection from '@/components/menu/MenuSection';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getData } from '@/lib/api';
import { User } from '@/lib/datatypes';

export default function MenuPage() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<User | null>(null);
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

  const buttons = [
    { label: '조회', targetId: '조회' },
    { label: '이체', targetId: '이체' },
    { label: '자산관리', targetId: '자산관리' },
    { label: '예적금', targetId: '예적금' },
    { label: '퇴직연금', targetId: '퇴직연금' },
    { label: '신탁', targetId: '신탁' },
  ];

  return (
    <div
      style={{ maxHeight: 'calc(100vh - 60px)' }}
      className='w-full overflow-y-scroll'
    >
      {/* <h1 className='font-semibold mb-2 mx-6 px-5 pt-4 '>전체메뉴</h1> */}
      {session?.user ? (
        <div className='bg-[#DCEFEA] flex items-center pb-2'>
          <div className='mb-2 mx-6 px-5 h-14 w-full flex justify-between items-center'>
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
        <div className='bg-[#DCEFEA] flex items-center mb-2'>
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
        <MenuSection title={'조회'}>
          <MenuCard title={'메뉴1'} link={'/'} />
          <MenuCard title={'메뉴2'} link={'/'} />
          <MenuCard title={'메뉴3'} link={'/'} />
        </MenuSection>
        <MenuSection title={'이체'}>
          <MenuCard title={'메뉴1'} link={'/'} />
          <MenuCard title={'메뉴2'} link={'/'} />
          <MenuCard title={'메뉴3'} link={'/'} />
        </MenuSection>
        <MenuSection title={'자산관리'}>
          <MenuCard title={'메뉴1'} link={'/'} />
          <MenuCard title={'메뉴2'} link={'/'} />
          <MenuCard title={'메뉴3'} link={'/'} />
        </MenuSection>
        <MenuSection title={'예적금'}>
          <MenuCard title={'메뉴1'} link={'/'} />
          <MenuCard title={'메뉴2'} link={'/'} />
          <MenuCard title={'메뉴3'} link={'/'} />
        </MenuSection>
        <MenuSection title={'퇴직연금'}>
          <MenuCard title={'메뉴1'} link={'/'} />
          <MenuCard title={'메뉴2'} link={'/'} />
          <MenuCard title={'메뉴3'} link={'/'} />
        </MenuSection>
        <MenuSection title={'펀드'}>
          <MenuCard title={'메뉴1'} link={'/'} />
          <MenuCard title={'메뉴2'} link={'/'} />
          <MenuCard title={'메뉴3'} link={'/'} />
        </MenuSection>
        <MenuSection title={'신탁'}>
          <MenuCard title={'메뉴1'} link={'/'} />
          <MenuCard title={'메뉴2'} link={'/'} />
          <MenuCard title={'메뉴3'} link={'/'} />
        </MenuSection>
      </div>
    </div>
  );
}
