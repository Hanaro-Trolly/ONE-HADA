'use client';

import { useAdminWebSocket } from '@/context/admin/AdminWebSocketContext';

interface RealTimeLogProps {
  userId: string;
  userName: string;
}

export default function RealTimeLog({ userId, userName }: RealTimeLogProps) {
  const { buttonLogs } = useAdminWebSocket();

  const userLogs = buttonLogs.filter((log) => log.customerId === userId);

  return (
    <div className='space-y-4'>
      <div className='text-lg font-medium mb-4'>{userName} 님의 버튼 로그</div>
      <div className='space-y-2'>
        {userLogs.length > 0 ? (
          userLogs.map((log, index) => (
            <div
              key={index}
              className='p-3 bg-gray-50 rounded-lg flex justify-between items-center'
            >
              <span className='font-medium'>버튼: {log.buttonId}</span>
              <span className='text-gray-500'>페이지: {log.path}</span>
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
