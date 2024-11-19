'use client';

import { useWebSocketContext } from '@/context/user/UserWebSocketContext';
import { useWebSocket } from '@/hooks/useWebsocket';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from './button';

interface CustomerViewProps {
  customerId: string;
}

export const CallButton: React.FC<CustomerViewProps> = ({ customerId }) => {
  const { startConsultation } = useWebSocketContext();

  const handleCallClick = () => {
    if (customerId) {
      startConsultation(customerId);
    }
  };

  return (
    <div className='h-14 w-full'>
      {/* <Link href='tel:010-2905-5905'> */}
      <Button
        id='callBtn'
        variant='ghost'
        className='w-full h-full text-[#635666] text-xl'
        onClick={handleCallClick}
      >
        <div className='tossface-icon'>📞</div>전화상담
      </Button>
      {/* </Link> */}
    </div>
  );
};
