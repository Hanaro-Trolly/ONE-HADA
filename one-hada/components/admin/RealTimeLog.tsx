'use client';

import { useFormattedDate } from '@/hooks/useFormattedDate';
import { IoOpenOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { fetchAllData } from '@/lib/api';

// Types
interface Log {
  timestamp: string;
  details: string;
}

interface ActivityLog {
  user_name: string;
  logs: Log[];
}

interface RealTimeLogProps {
  userId: string;
  userName: string;
}

// Constants
const SERVICE_URL = 'http://localhost:3000';

export default function RealTimeLog({ userName }: RealTimeLogProps) {
  const [logs, setLogs] = useState<Log[]>([]);
  const { formatDate } = useFormattedDate();

  useEffect(() => {
    const fetchLogs = async () => {
      if (!userName) return;

      try {
        const activityLogs = await fetchAllData<ActivityLog>('activity_logs');
        const userActivityLog = activityLogs.find(
          (log) => log.user_name === userName
        );

        setLogs(userActivityLog?.logs || []);
      } catch (error) {
        console.error('Error loading logs:', error);
        setLogs([]);
      }
    };

    fetchLogs();
  }, [userName]);

  const handleServiceOpen = () => {
    setTimeout(() => {
      window.open(SERVICE_URL, '_blank', 'noopener,noreferrer');
    }, 100);
  };

  return (
    <div className='h-[600px] w-full rounded-lg border bg-white shadow-sm overflow-auto'>
      <header className='flex justify-between sticky top-0 bg-gray-50 p-4 border-b'>
        <h2 className='flex items-center text-lg font-semibold text-gray-800'>
          {userName}님의 활동 내역
        </h2>
        <button
          onClick={handleServiceOpen}
          className='flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors'
          aria-label='원하다 페이지 새 창에서 열기'
        >
          <IoOpenOutline size={18} aria-hidden='true' />
          <span>원하다 페이지 열기</span>
        </button>
      </header>

      <div className='p-4 space-y-3'>
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <article
              key={index}
              className='p-4 rounded-lg bg-white border border-gray-200 transition-colors hover:border-gray-300'
            >
              <time className='text-sm text-gray-500 block mb-2'>
                {formatDate(log.timestamp)}
              </time>
              <p className='text-gray-700 ml-1'>{log.details}</p>
            </article>
          ))
        ) : (
          <div
            className='text-center py-8 text-gray-500'
            role='status'
            aria-label='활동 내역 없음'
          >
            활동 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
