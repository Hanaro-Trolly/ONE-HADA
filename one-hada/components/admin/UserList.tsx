'use client';

import adminData from '@/app/admin/data/AdminData.json';
import { useAdminSession } from '@/context/admin/SessionContext';
import { useEffect, useState } from 'react';

// Types
interface Counsel {
  id: number;
  agentid: string;
  userid: string;
  title: string;
  content: string;
  date: string;
}

interface LatestCounsel {
  userid: string;
  date: string;
  title: string;
}

export default function UserList() {
  // State
  const [counselData, setCounselData] = useState<Counsel[]>([]);
  const [uniqueUsers, setUniqueUsers] = useState<LatestCounsel[]>([]);

  // Hooks
  const { session } = useAdminSession();

  // Effects
  useEffect(() => {
    setCounselData(adminData.counsel);
  }, []);

  useEffect(() => {
    if (!counselData.length || !session.loginUser?.id) return;

    const latestCounsels = new Map<string, LatestCounsel>();

    counselData
      .filter((item) => item.agentid === session.loginUser?.id)
      .forEach((counsel) => {
        const existing = latestCounsels.get(counsel.userid);
        if (!existing || new Date(counsel.date) > new Date(existing.date)) {
          latestCounsels.set(counsel.userid, {
            userid: counsel.userid,
            date: counsel.date,
            title: counsel.title,
          });
        }
      });

    const sortedUsers = Array.from(latestCounsels.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setUniqueUsers(sortedUsers);
  }, [counselData, session.loginUser?.id]);

  if (!session.loginUser) {
    return (
      <div
        className='flex items-center justify-center h-40'
        role='alert'
        aria-label='로그인 필요'
      >
        <p className='text-center text-gray-500'>로그인 상태가 아닙니다.</p>
      </div>
    );
  }

  return (
    <div className='p-4 space-y-6'>
      <header>
        <h2 className='text-xl font-bold'>상담 고객 목록</h2>
      </header>

      <div className='divide-y divide-gray-200'>
        {uniqueUsers.map((user) => (
          <article
            key={user.userid}
            className='py-4 hover:bg-gray-50 transition-colors'
          >
            <div className='flex justify-between items-center'>
              <div className='space-y-1'>
                <h3 className='font-semibold'>{user.userid}</h3>
                <time className='text-sm text-gray-600' dateTime={user.date}>
                  최근 상담: {new Date(user.date).toLocaleDateString()}
                </time>
                <p className='text-sm text-gray-700 line-clamp-1'>
                  {user.title}
                </p>
              </div>
            </div>
          </article>
        ))}

        {uniqueUsers.length === 0 && (
          <div
            className='py-8 text-center text-gray-500'
            role='status'
            aria-label='상담 내역 없음'
          >
            상담 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
