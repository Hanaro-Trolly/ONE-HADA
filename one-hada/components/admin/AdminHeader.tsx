'use client';

import adminData from '@/app/admin/data/AdminData.json';
import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Title from './AdminTitle';

export default function AdminHeader() {
  const router = useRouter();
  const { setCounselData, counselData, setSelectedUserId } = useCounsel();
  const [uniqueUsers, setUniqueUsers] = useState<string[]>([]);
  const { session, logout } = useAdminSession();

  useEffect(() => {
    setCounselData(adminData.counsel);
  }, [setCounselData]);

  useEffect(() => {
    if (counselData.length > 0 && session.loginUser?.id) {
      const filteredUsers = counselData
        .filter((item) => item.agentid === session.loginUser?.id)
        .map((item) => item.userid)
        .filter((value, index, self) => self.indexOf(value) === index);

      setUniqueUsers(filteredUsers);
    }
  }, [counselData, session.loginUser?.id]);

  if (!session.loginUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='align-middle text-center text-gray-500 py-4'>
          로그인 하세요.
        </p>
      </div>
    );
  }

  // components/admin/AdminHeader.tsx
  const handleUserClick = (userid: string) => {
    setSelectedUserId(userid);
    // URL 인코딩 처리
    const encodedUserId = encodeURIComponent(userid);
    router.push(`/admin/${encodedUserId}`, { scroll: false });
  };

  const handleLogout = () => {
    logout(); // 로그아웃 처리
    router.push('/admin'); // page.tsx로 리디렉션
  };

  return (
    <div className='p-4 bg-gray-100'>
      <div className='flex justify-between items-center pb-4'>
        <Title text='목록' />
        <button
          onClick={handleLogout}
          className='px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition-colors duration-200'
        >
          Logout
        </button>
      </div>
      <div>
        {uniqueUsers.map((userid) => {
          const latestCounsel = counselData
            .filter(
              (item) =>
                item.agentid === session.loginUser?.id && item.userid === userid
            )
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )[0];

          const formattedDate = latestCounsel
            ? latestCounsel.date
                .split(' ')
                .slice(0, 3)
                .join(' ')
                .replace(/\.$/, '')
            : '';

          return (
            <button
              key={userid}
              onClick={() => handleUserClick(userid)}
              className='mt-5 py-4 rounded-2xl w-full text-left bg-white hover:bg-gray-300 transition-colors duration-200'
            >
              <div className='pl-3 items-center'>
                <div className='flex flex-col space-y-1'>
                  <h3 className='font-medium'>{userid}</h3>
                  <p className='text-sm text-gray-400'>{formattedDate}</p>
                  <p className='text-sm font-medium text-gray-600'>
                    {latestCounsel?.title}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {uniqueUsers.length === 0 && (
        <p className='text-center text-gray-500 py-4'>상담 내역이 없습니다.</p>
      )}
    </div>
  );
}
