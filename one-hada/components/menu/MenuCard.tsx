import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

type MenuCardProps = {
  title: string;
  link: string;
  id: string;
};

export default function MenuCard({ title, link, id }: MenuCardProps) {
  return (
    <div className='flex justify-start text-center items-center pt-4 text-sm'>
      <Link href={link}>
        <Button
          id={'menuButton' + id}
          variant='ghost'
          className='w-full flex justify-between'
        >
          {title} <ChevronRightIcon size='15' className='text-gray-400' />
        </Button>
      </Link>
      {link && <a href={link} className='card-link'></a>}
    </div>
  );
}
