'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const tabs = [
  { name: '활동내역', href: '/activity/history', id: 'History' },
  { name: '바로가기', href: '/activity/shortcut', id: 'Shortcut' },
  { name: '상담내역', href: '/activity/consultations', id: 'Consultation' },
];

const TabBar = () => {
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const tabIndex = tabs.findIndex((tab) => currentPath === tab.href);
    setPosition(tabIndex !== -1 ? tabIndex : 0);
  }, []);

  if (position === null) {
    return null;
  }

  return (
    <ul className='flex justify-between fixed w-full'>
      {tabs.map((tab, index) => (
        <li
          key={tab.href}
          className={cn(
            'w-full bg-main-background',
            position === index
              ? 'border-b-[3px] border-[#AEDBCE] text-[#3F8D77]'
              : 'border-b'
          )}
        >
          <Link href={tab.href} className='h-10'>
            <Button
              id={`activityTab${tab.id}`}
              variant='ghost'
              className='w-full rounded-none hover:bg-main-background hover:text-[#3F8D77]'
              onClick={() => setPosition(index)}
            >
              {tab.name}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TabBar;
