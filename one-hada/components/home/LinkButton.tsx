// LinkButton.tsx
import Link from 'next/link';
import { Button } from '../ui/button';

const LinkButton = ({
  id,
  href,
  text,
  icon,
  style,
  variant = 'home',
}: {
  id: string;
  href: string;
  text: string;
  icon: string;
  style: string;
  variant?: 'home' | 'ghost';
}) => (
  <Link href={href}>
    <Button id={id} variant={variant} className={`w-full h-full ${style}`}>
      <div className='flex flex-col justify-center items-center gap-2'>
        <div className='tossface-icon text-[2rem]'>{icon}</div>
        {text}
      </div>
    </Button>
  </Link>
);

export default LinkButton;
