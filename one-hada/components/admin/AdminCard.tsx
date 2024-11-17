'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const DevideChar = '\n';

type ConsultationCardProps = {
  title: string;
  date: string;
  content: string;
  birth: string;
  phone: string;
};

export default function AdminCard({
  title,
  date,
  content,
}: ConsultationCardProps) {
  const [isDetail, setIsDetail] = useState(false);
  const oneLineContent = content.split(DevideChar);

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const toggle = () => {
    setIsDetail((pre) => !pre);
  };

  return (
    <>
      <div className='w-full h-20 flex justify-between border-b p-2 px-5 bg-white'>
        <div className='ml-2 flex flex-col gap-1 justify-center'>
          <div className='text-[#839AA8] text-xs'>{formatDate(date)}</div>
          <div
            className={cn(
              'font-medium',
              isDetail ? 'text-[#479E86]' : 'text-black'
            )}
          >
            {title}
          </div>
        </div>
        <div className='items-center flex justify-center'>
          <button onClick={toggle}>
            {isDetail ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>
      {isDetail ? (
        <div className='p-3 bg-[#fafcfb] border-l-4 border-l-[#479E86] border-b text-sm'>
          <ul>
            {oneLineContent.map((line, idx) => (
              <li key={idx} className='flex gap-2'>
                <div className='text-[8px] font-extrabold text-[#479E86]'>
                  O
                </div>
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
