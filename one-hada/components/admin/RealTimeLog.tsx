'use client';

import { IoOpenOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { fetchAllData } from '@/lib/api';

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

export default function RealTimeLog({ userName }: RealTimeLogProps) {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // activity_logs 데이터 가져오기
        const activityLogs = await fetchAllData<ActivityLog>('activity_logs');

        // 현재 사용자의 로그 찾기
        const userActivityLog = activityLogs.find(
          (log) => log.user_name === userName
        );

        if (userActivityLog) {
          setLogs(userActivityLog.logs);
        } else {
          setLogs([]);
        }
      } catch (error) {
        console.error('Error loading logs:', error);
        setLogs([]);
      }
    };

    if (userName) {
      fetchLogs();
    }
  }, [userName]);

  const openServiceWindow = () => {
    setTimeout(() => {
      window.open('http://localhost:3000', '_blank');
    }, 100);
  };

  return (
    <div className='h-[600px] w-full rounded-lg border bg-white shadow-sm overflow-auto'>
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

      <div className='p-4 space-y-3'>
        {logs.map((log, index) => (
          <div
            key={index}
            className='p-4 rounded-lg bg-white border border-gray-200 transition-colors'
          >
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-sm text-gray-500'>
                {new Date(log.timestamp).toLocaleString('ko-KR')}
              </span>
            </div>
            <p className='text-gray-700 ml-1'>{log.details}</p>
          </div>
        ))}

        {logs.length === 0 && (
          <div className='text-center py-8 text-gray-500'>
            활동 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
