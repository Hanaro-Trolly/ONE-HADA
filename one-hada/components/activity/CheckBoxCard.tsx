'use client';

import { FaCheck } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type CheckBoxCardProps = {
  id: string;
  title: string;
  description: string;
  isChecked: boolean;
  onChange: (key: string, isChecked: boolean) => void;
};

export default function CheckBoxCard({
  id,
  title,
  description,
  isChecked,
  onChange,
}: CheckBoxCardProps) {
  const toggle = () => {
    const newCheckedState = !isChecked;
    onChange(title, newCheckedState);
  };

  const fieldMapping = new Map<string, string>([
    ['myAccount', '내계좌'],
    ['receiverAccount', '상대계좌'],
    ['amount', '금액'],
    ['period', '기간'],
    ['transferType', '거래유형'],
    ['searchWord', '검색어'],
  ]);

  return (
    <Button
      id={id}
      className={cn(
        'p-2 h-10 rounded-lg flex items-center gap-2 w-full border mb-1',
        isChecked ? 'bg-gray-100 shadow-inner ' : 'bg-white shadow-sm'
      )}
      variant='ghost'
      onClick={toggle}
    >
      <FaCheck
        className={cn(isChecked ? 'text-main-green' : 'text-gray-400')}
      />
      <div className='flex-1'>
        <div
          className={cn(
            'text-xs text-left mt-1',
            isChecked ? 'font-semibold text-black' : 'font-medium text-gray-500'
          )}
        >
          {fieldMapping.get(title)}
        </div>
        <div className='text-[10px] text-slate-500 text-left'>
          {description}
        </div>
      </div>
    </Button>
  );
}
