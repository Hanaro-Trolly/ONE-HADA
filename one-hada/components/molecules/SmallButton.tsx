'use client';

import { ButtonHTMLAttributes } from 'react';
import { Button } from '../ui/button';

export default function SmallButton({
  children,
  classNames,
  ...props
}: {
  children: React.ReactNode;
  classNames?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <Button
        size='sm'
        className={`${classNames} rounded-2xl h-7 w-16 font-bold`}
        {...props}
      >
        <div className='flex'>{children}</div>
      </Button>
    </>
  );
}
