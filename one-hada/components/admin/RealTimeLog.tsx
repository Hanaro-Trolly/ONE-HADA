'use client';

import { useAdminWebSocket } from '@/context/admin/AdminWebSocketContext';
import { IoOpenOutline } from 'react-icons/io5';
import { useEffect, useRef } from 'react';

interface RealTimeLogProps {
  userId: string;
  userName: string;
}

export default function RealTimeLog({ userId, userName }: RealTimeLogProps) {
  const { buttonLogs } = useAdminWebSocket();

  const userLogs = buttonLogs.filter((log) => log.customerId === userId);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openServiceWindow = () => {
    setTimeout(() => {
      window.open('http://localhost:3000', '_blank');
    }, 100);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [userLogs]);

  return (
    <div
      className='h-[600px] w-full rounded-lg border bg-white shadow-sm overflow-auto'
      ref={scrollRef}
    >
      <div className='flex justify-between sticky top-0 bg-gray-50 p-4 border-b'>
        <h2 className='flex items-center text-lg font-semibold text-gray-800'>
          {userName}님의 활동 내역
        </h2>
        <button
          onClick={openServiceWindow}
          className='flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors'
        >
          <IoOpenOutline size={18} />
          <span>원하다 페이지 열기</span>
        </button>
      </div>

      <div className='space-y-2 p-2 '>
        {userLogs.length > 0 ? (
          userLogs.map((log, index) => (
            <div
              key={index}
              className='p-3 bg-gray-50 rounded-lg flex justify-between items-center'
            >
              <span className='font-medium'>{log.buttonId}을 눌렀습니다.</span>
              <span className='text-sm text-gray-400'>{log.timestamp}</span>
            </div>
          ))
        ) : (
          <div className='text-center text-gray-500'>
            아직 기록된 로그가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
