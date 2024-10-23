'use client';

import ShortCutCard from '@/components/molecules/ShortCutCard';
import SmallButton from '@/components/molecules/SmallButton';
import { Edit2Icon, RotateCcwIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

type ShortCut = {
  title: string;
  isFavorite: boolean;
};
const Temp: ShortCut[] = [
  { title: '오늘 결제내역', isFavorite: true },
  { title: '철수한테 송금', isFavorite: false },
  { title: '밥플러스 결제내역', isFavorite: false },
  { title: '예금계좌 조회', isFavorite: false },
  { title: '강희한테 2000원 송금', isFavorite: true },
  { title: '대출하기', isFavorite: false },
  { title: '관리비 납부', isFavorite: true },
  { title: '시온이한테 7억 송금', isFavorite: false },
];

const favoriteList = Temp.filter(({ isFavorite }) => isFavorite);
const normalList = Temp.filter(({ isFavorite }) => !isFavorite);
export default function ShortCutPage() {
  const [isDelete, setIsDelete] = useState(false);
  const toggle = () => setIsDelete((pre) => !pre);
  return (
    <>
      <ul>
        <li className='h-10 flex items-center w-full justify-between pr-4 pt-2'>
          <div></div>
          <div className='mx-2'>
            {isDelete ? (
              <div className='flex gap-2'>
                <SmallButton
                  classNames='text-[#666666] bg-white hover:bg-gray-200'
                  onClick={toggle}
                >
                  <RotateCcwIcon />
                  취소
                </SmallButton>
                <SmallButton classNames='bg-[#E44B5B] hover:bg-[#B61C2B]'>
                  <Trash2Icon />
                  삭제
                </SmallButton>
              </div>
            ) : (
              <SmallButton
                classNames='bg-[#5e7887] hover:bg-[#3f505a]'
                onClick={toggle}
              >
                <Edit2Icon />
                편집
              </SmallButton>
            )}
          </div>
        </li>
        {favoriteList.map((item, idx) => (
          <li key={idx}>
            <ShortCutCard
              id={'' + idx}
              name={item.title}
              isEdit={isDelete}
              isFavorite={true}
            />
          </li>
        ))}
        {normalList.map((item, idx) => (
          <li key={idx + favoriteList.length}>
            <ShortCutCard
              id={'' + idx}
              name={item.title}
              isEdit={isDelete}
              isFavorite={false}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
