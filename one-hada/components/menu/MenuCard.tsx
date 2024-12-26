import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

type MenuCardProps = {
  title: string;
  link: string;
  id: string;
  onClick?: () => void;
};

export default function MenuCard({ title, link, id, onClick }: MenuCardProps) {
  return (
    <div className='flex justify-start text-center items-center pt-4 text-sm'>
      <Button
        id={'menuButton' + id}
        variant='ghost'
        className='w-full flex justify-between'
        onClick={onClick}
      >
        {title} <ChevronRightIcon size='15' className='text-gray-400' />
      </Button>
      {link && <a href={link} className='card-link'></a>}
    </div>
  );
}
