'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type menuPage = {
  title: string;
  subButtons: string[];
  products: string[];
};

const MENU_LIST: Record<string, menuPage> = {
  loan: {
    title: '대출',
    subButtons: ['대출 버튼 1', '대출 버튼 2', '대출 버튼 3'],
    products: ['대출 상품 1', '대출 상품 2', '대출 상품 3'],
  },
  deposit: {
    title: '예금',
    subButtons: ['예금 버튼 1', '예금 버튼 2', '예금 버튼 3'],
    products: ['예금 상품 1', '예금 상품 2', '예금 상품 3'],
  },
  investment: {
    title: '투자',
    subButtons: ['투자 버튼 1', '투자 버튼 2', '투자 버튼 3'],
    products: ['투자 상품 1', '투자 상품 2', '투자 상품 3'],
  },
  insurance: {
    title: '보험',
    subButtons: ['보험 버튼 1', '보험 버튼 2', '보험 버튼 3'],
    products: ['보험 상품 1', '보험 상품 2', '보험 상품 3'],
  },
};

export default function MenuPage({ params }: { params: { menuId: string } }) {
  const router = useRouter();
  const [selectedButtonIdx, setSelectedButtonIdx] = useState<number>(0);
  const { menuId } = params;
  const menu: menuPage = MENU_LIST[menuId];

  return (
    <div className='bg-[#DCEFEA] min-h-[calc(100vh-64px)] overflow-y-scroll mt-3 shadow-sm flex justify-center'>
      <div className='m-3 p-2 bg-white w-full flex flex-col gap-2'>
        <div className='text-xl text-[#698596] font-semibold text-center'>
          {menu.title}
        </div>
        <div className='flex gap-2'>
          {menu.subButtons.map((subButton, index) => (
            <div key={index}>
              <Button
                variant='ghost'
                className='w-full border'
                id={menuId + index}
                onClick={() => setSelectedButtonIdx(index)}
              >
                {subButton}
              </Button>
            </div>
          ))}
        </div>
        <div className='w-full h-full border-2 items-center justify-center flex'>
          <div className='w-full h-full flex flex-col gap-2 items-center justify-center'>
            <div className='text-center'>
              {menu.products[selectedButtonIdx]}
            </div>
            <Button
              variant='ghost'
              className='w-full'
              id={'product' + menuId + selectedButtonIdx}
              onClick={() => router.push('/')}
            >
              상품 신청
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
