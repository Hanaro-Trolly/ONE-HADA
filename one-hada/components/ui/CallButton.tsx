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
  const { connectWebSocket } = useWebSocket({
    role: 'customer',
    customerId,
  });
  const { setCustomerId } = useWebSocketContext();

  useEffect(() => {
    // WebSocket Context에 customerId 설정
    setCustomerId(customerId);
  }, [customerId, setCustomerId]);

  const handleCallClick = () => {
    if (customerId) {
      connectWebSocket();
      console.log('Connecting WebSocket with customerId:', customerId); // 디버깅용
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
