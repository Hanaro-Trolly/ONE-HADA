'use client';

import { useFormattedDate } from '@/hooks/useFormattedDate';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Constants
const DIVIDER_CHAR = '\n';

// Types
interface ConsultationCardProps {
  title: string;
  date: string;
  content: string;
  birth: string;
  phone: string;
}

export default function AdminCard({
  title,
  date,
  content,
}: ConsultationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { formatDateWithTime } = useFormattedDate();
  const contentLines = content.split(DIVIDER_CHAR);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className='consultation-card'>
      <div className='w-full h-20 flex justify-between border-b p-2 px-5 bg-white'>
        <div className='ml-2 flex flex-col gap-1 justify-center'>
          <time className='text-[#839AA8] text-xs'>
            {date ? formatDateWithTime(date) : '날짜 없음'}
          </time>
          <h3
            className={cn(
              'font-medium',
              isExpanded ? 'text-[#479E86]' : 'text-black'
            )}
          >
            {title}
          </h3>
        </div>
        <button
          className='[&_svg]:size-6'
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? '내용 접기' : '내용 펼치기'}
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {isExpanded && (
        <div className='p-3 bg-[#fafcfb] border-l-4 border-l-[#479E86] border-b text-sm'>
          <ul>
            {contentLines.map((line, index) => (
              <li key={index} className='flex gap-2'>
                <span className='text-[8px] font-extrabold text-[#479E86]'>
                  O
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
