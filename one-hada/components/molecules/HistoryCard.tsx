import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

type HistoryCardProps = {
  id: string;
  name: string;
  date: string;
  isConsulting: boolean;
};

export default function HistoryCard({
  id,
  name,
  date,
  isConsulting = false,
}: HistoryCardProps) {
  console.log(`🚀 ~ key:`, id);
  console.log('🚀 ~ isConsulting:', isConsulting);
  console.log('🚀 ~ date:', date);
  console.log('🚀 ~ name:', name);

  return (
    <>
      <div
        key={id}
        className='bg-white shadow-md rounded-lg border-l-[10px] border-[#AEDBCE] m-4 mx-6 p-4 px-5 h-20 flex justify-between'
      >
        <div className='flex flex-col gap-1'>
          <h1 className='font-medium text-lg'>{name}</h1>
          <label className='font-light text-gray-500 text-sm'>{date}</label>
        </div>
        <div>
          <Link href={`/activity/history/create`}>
            <Button
              id={id}
              className='rounded-full bg-[#61B89F] hover:bg-[#377b68]'
            >
              등록 <ChevronRight />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
