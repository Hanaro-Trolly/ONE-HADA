import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import React from 'react';

const LoginPrompt = () => {
  return (
    <div className='mr-6 px-5 h-14 w-full flex justify-between items-center text-gray-500'>
      <span>로그인을 해주세요.</span>
      <Button
        variant='ghost'
        className='px-0 py-0 font-normal'
        onClick={() => signIn()}
      >
        로그인 <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default LoginPrompt;
