import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import React from 'react';

const WithdrawButton = () => (
  <div className='flex items-center h-5 text-gray-500'>
    <Button variant='ghost' className='px-0 py-0 gap-0 font-normal'>
      회원탈퇴 <ChevronRightIcon />
    </Button>
  </div>
);

export default WithdrawButton;
