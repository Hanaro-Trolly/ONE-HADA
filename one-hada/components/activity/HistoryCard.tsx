import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

type HistoryCardProps = {
  id: string;
  name: string;
  date: string;
};
export default function HistoryCard({ id, name, date }: HistoryCardProps) {
  return (
    <>
      <div
        key={id}
        className='bg-white shadow-md rounded-lg border-l-[10px] border-[#AEDBCE] mb-4 mx-6 p-4 px-3 h-20 flex justify-between'
      >
        <div className='flex flex-col gap-1 w-52'>
          <h1 className='font-medium text-lg overflow-ellipsis overflow-hidden whitespace-nowrap'>
            {name}
          </h1>
          <label className='font-light text-gray-500 text-sm'>{date}</label>
        </div>
        <div className='flex items-center'>
          <Link href={`/activity/history/${id}`}>
            <Button
              id={`historyButtonHistoryModal`}
              className='rounded-full bg-main-green hover:ring-main-green hover:bg-main-green'
              size='sm'
            >
              등록 <ChevronRight />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
