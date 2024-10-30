import { ChevronRightIcon } from 'lucide-react';

type MenuCardProps = {
  title: string;
  link: string;
};

export default function MenuCard({ title, link }: MenuCardProps) {
  return (
    <div className='flex justify-start text-center items-center pt-4 text-sm'>
      {title}
      {link && (
        <a href={link} className='card-link'>
          <ChevronRightIcon size='15' className='text-gray-400' />
        </a>
      )}
    </div>
  );
}
