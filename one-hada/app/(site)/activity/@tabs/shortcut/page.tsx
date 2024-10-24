'use client';

import ShortCutCard from '@/components/molecules/ShortCutCard';
import SmallButton from '@/components/molecules/SmallButton';
import { Edit2Icon, RotateCcwIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

type ShortCut = {
  id: string;
  title: string;
  isFavorite: boolean;
};
const Temp: ShortCut[] = [
  { id: '1', title: '오늘 결제내역', isFavorite: true },
  { id: '2', title: '철수한테 송금', isFavorite: false },
  { id: '3', title: '밥플러스 결제내역', isFavorite: false },
  { id: '4', title: '예금계좌 조회', isFavorite: false },
  { id: '5', title: '강희한테 2000원 송금', isFavorite: true },
  { id: '6', title: '대출하기', isFavorite: false },
  { id: '7', title: '관리비 납부', isFavorite: true },
  { id: '8', title: '시온이한테 7억 송금', isFavorite: false },
];

const favoriteList = Temp.filter(({ isFavorite }) => isFavorite);
const normalList = Temp.filter(({ isFavorite }) => !isFavorite);
export default function ShortCutPage() {
  const [isDelete, setIsDelete] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const toggle = () => setIsDelete((pre) => !pre);

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = new Set(prev);
      if (newCheckedItems.has(id)) {
        newCheckedItems.delete(id);
      } else {
        newCheckedItems.add(id);
      }
      return newCheckedItems;
    });
  };

  const deleteHandler = () => {
    console.log(`id: ${Array.from(checkedItems).join(', ')} 삭제!`);
    setCheckedItems(new Set());
    toggle();
  };

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
                <SmallButton
                  classNames='bg-[#E44B5B] hover:bg-[#B61C2B]'
                  onClick={deleteHandler}
                >
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
        {favoriteList.map((item) => (
          <li key={item.id}>
            <ShortCutCard
              id={item.id}
              name={item.title}
              isEdit={isDelete}
              isFavorite={true}
              onCheckboxChange={handleCheckboxChange}
            />
          </li>
        ))}
        {normalList.map((item) => (
          <li key={item.id}>
            <ShortCutCard
              id={item.id}
              name={item.title}
              isEdit={isDelete}
              isFavorite={false}
              onCheckboxChange={handleCheckboxChange}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
