'use client';

import { Button } from '@/components/ui/button';
import { PRODUCT_LIST } from '@/data/productData';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MenuPage({ params }: { params: { menuId: string } }) {
  const searchParams = useSearchParams();
  const [selectedButtonIdx, setSelectedButtonIdx] = useState<number>(0);
  const router = useRouter();
  const { menuId } = params;
  const menus = PRODUCT_LIST[menuId];

  const productClickHandler = (productName: string) => {
    alert(`${productName}이 신청되었습니다.`);
    router.push('/');
  };

  useEffect(() => {
    if (!menus) {
      router.push('/not-found');
    }
  }, [menus, router]);

  useEffect(() => {
    const currentProductIdx = Number(searchParams.get('productIdx') || '0');
    setSelectedButtonIdx(currentProductIdx);
  }, [searchParams]);
  if (!menus) {
    return null;
  }
  return (
    <div className='bg-[#DCEFEA] min-h-[calc(100vh-64px)] overflow-y-scroll mt-3 shadow-sm flex justify-center'>
      <div className='m-3 p-2 bg-white w-full flex flex-col gap-2'>
        <div className='text-xl text-[#698596] font-semibold text-center'>
          {menus.title}
        </div>
        <div className='flex gap-2 flex-wrap'>
          {menus.subButtons.map((subButton, index) => (
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
          <div className='w-full h-full flex flex-col gap-1 items-center justify-between p-4'>
            <div className='text-center text-xl font-semibold mb-1'>
              {menus.products[selectedButtonIdx]}
            </div>
            {menus.images && menus.images[selectedButtonIdx] && (
              <div className='relative w-full h-[200px]'>
                <div className='relative w-full h-[200px] my-1'>
                  <Image
                    src={menus.images[selectedButtonIdx]}
                    alt={menus.products[selectedButtonIdx]}
                    fill
                    className='object-contain'
                  />
                </div>
              </div>
            )}
            <div className='text-sm text-center mt-1'>
              {menus.details && menus.details[selectedButtonIdx]}
            </div>
            <Button
              variant='ghost'
              className='w-40 mt-1 bg-main-green text-white'
              id={'product' + menuId + selectedButtonIdx}
              onClick={() =>
                productClickHandler(menus.products[selectedButtonIdx])
              }
            >
              상품 신청
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
