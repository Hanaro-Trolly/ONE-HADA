'use client';

import HistoryCard from '@/components/molecules/HistoryCard';
import ShortCutCard from '@/components/molecules/ShortCutCard';
import SmallButton from '@/components/molecules/SmallButton';
import { Edit2Icon, RotateCcwIcon, Trash2Icon } from 'lucide-react';
import UserList from './UserList';

export default function ComponentTest() {
  return (
    <>
      <div className='font-bold'>폰트 테스트</div>
      <div>
        <UserList />
      </div>
      <div>
        <HistoryCard
          id='1'
          name='테스트'
          date='2024.10.22'
          isConsulting={false}
        ></HistoryCard>
        <HistoryCard
          id='2'
          name='테스트'
          date='2024.10.22'
          isConsulting={false}
        ></HistoryCard>
        <ShortCutCard
          id='1'
          name='바로가기카드'
          isEdit={false}
          isFavorite={true}
        ></ShortCutCard>
        <ShortCutCard
          id='2'
          name='바로가기 편집'
          isEdit={true}
          isFavorite={true}
        ></ShortCutCard>
        <SmallButton classNames='bg-[#E44B5B] hover:bg-[#B61C2B]'>
          <Trash2Icon />
          삭제
        </SmallButton>
        <SmallButton classNames='bg-[#5e7887] hover:bg-[#3f505a]'>
          <Edit2Icon />
          편집
        </SmallButton>
        <SmallButton classNames='text-[#666666] bg-white hover:bg-gray-200'>
          <RotateCcwIcon />
          취소
        </SmallButton>
      </div>
    </>
  );
}
