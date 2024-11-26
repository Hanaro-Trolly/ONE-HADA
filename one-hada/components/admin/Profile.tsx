'use client';

import { useAdminSession } from '@/context/admin/SessionContext';

export default function Profile() {
  const { session } = useAdminSession();

  if (!session.loginUser) return null;

  return (
    <div className='flex items-center p-4'>
      <div
        className='text-gray-600 text-xl font-medium'
        aria-label={`${session.loginUser.agent_name}님의 프로필`}
      >
        안녕하세요,{' '}
        <span className='text-main-green'>{session.loginUser.agent_name}</span>{' '}
        님!
      </div>
    </div>
  );
}
