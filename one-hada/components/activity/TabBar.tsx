'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export default function TabBar() {
  const [position, setPosition] = useState(0);
  return (
    <>
      {' '}
      <ul className='flex justify-between fixed w-full'>
        <li
          className={cn(
            'w-full bg-main-background',
            position === 0
              ? 'border-b-[3px] border-[#AEDBCE] text-[#3F8D77]'
              : 'border-b'
          )}
        >
          <Link href='/activity/history' className='h-10'>
            <Button
              variant='ghost'
              className='w-full rounded-none hover:bg-main-background hover:text-[#3F8D77]'
              onClick={() => setPosition(0)}
            >
              활동내역
            </Button>
          </Link>
        </li>
        <li
          className={cn(
            'w-full bg-main-background',
            position === 1
              ? 'border-b-[3px] border-[#AEDBCE] text-[#3F8D77]'
              : 'border-b'
          )}
        >
          <Link href='/activity/shortcut' className='h-10'>
            <Button
              variant='ghost'
              className='w-full rounded-none hover:bg-main-background hover:text-[#3F8D77]'
              onClick={() => setPosition(1)}
            >
              바로가기
            </Button>
          </Link>
        </li>
        <li
          className={cn(
            'w-full bg-main-background',
            position === 2
              ? 'border-b-[3px] border-[#AEDBCE] text-[#3F8D77]'
              : 'border-b'
          )}
        >
          <Link href='/activity/consultations' className='h-10'>
            <Button
              variant='ghost'
              className='w-full rounded-none hover:bg-main-background hover:text-[#3F8D77]'
              onClick={() => setPosition(2)}
            >
              상담내역
            </Button>
          </Link>
        </li>
      </ul>
    </>
  );
}
