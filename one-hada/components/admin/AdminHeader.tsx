'use client';

import { Counsel } from '@/app/admin/types/counsel';
import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchAllData } from '@/lib/api';
import Title from './AdminTitle';

export default function AdminHeader() {
  const router = useRouter();
  const { counselData, setSelectedUserId } = useCounsel();
  const { fetchCounselData } = useCounsel();
  const [uniqueUsers, setUniqueUsers] = useState<Counsel[]>([]);
  const [userData, setUserData] = useState<{ [key: string]: string }>({});
  const { session, logout } = useAdminSession();

  // 사용자 데이터 가져오기
  useEffect(() => {
    const loadUserData = async () => {
      const users = await fetchAllData<{ id: string; user_name: string }>(
        'user'
      );
      const userMap = users.reduce(
        (acc, user) => {
          acc[user.id] = user.user_name;
          return acc;
        },
        {} as { [key: string]: string }
      );
      setUserData(userMap);
    };

    loadUserData();
  }, []);

  useEffect(() => {
    fetchCounselData();
  }, [fetchCounselData]);

  useEffect(() => {
    if (counselData.length > 0 && session.loginUser?.id) {
      const userLatestCounsels = new Map<string, Counsel>();

      counselData
        .filter((item) => item.agent_id === session.loginUser?.id)
        .forEach((counsel) => {
          const existingCounsel = userLatestCounsels.get(counsel.user_id);
          if (
            !existingCounsel ||
            new Date(counsel.consultation_date) >
              new Date(existingCounsel.consultation_date)
          ) {
            userLatestCounsels.set(counsel.user_id, counsel);
          }
        });

      setUniqueUsers(Array.from(userLatestCounsels.values()));
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

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    const encodedUserId = encodeURIComponent(userId);
    router.push(`/admin/${encodedUserId}`, { scroll: false });
  };

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='p-4 bg-gray-100'>
      <div className='flex justify-between items-center pb-4'>
        <Title text='목록' />
        <button
          onClick={handleLogout}
          className='px-3 py-2 text-sm font-semibold text-main-green bg-white rounded hover:bg-gray-300 border border-main-green transition-colors duration-200'
        >
          Logout
        </button>
      </div>
      <div>
        {uniqueUsers.map((counsel) => (
          <button
            key={counsel.user_id}
            onClick={() => handleUserClick(counsel.user_id)}
            className='mt-5 py-4 rounded-2xl w-full text-left bg-white hover:bg-gray-300 transition-colors duration-200'
          >
            <div className='pl-3 items-center'>
              <div className='flex flex-col space-y-1'>
                <h3 className='font-medium'>
                  {userData[counsel.user_id] || 'Unknown User'}
                </h3>
                <p className='text-sm text-gray-400'>
                  {formatDate(counsel.consultation_date)}
                </p>
                <p className='text-sm font-medium text-gray-600'>
                  {counsel.consultation_title}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {uniqueUsers.length === 0 && (
        <p className='text-center text-gray-500 py-4'>상담 내역이 없습니다.</p>
      )}
    </div>
  );
}
