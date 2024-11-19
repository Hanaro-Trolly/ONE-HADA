'use client';

import { Counsel } from '@/app/admin/types/counsel';
import { useAdminWebSocket } from '@/context/admin/AdminWebSocketContext';
import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { useWebSocket } from '@/hooks/useWebsocket';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
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
  const params = useParams();
  const currentUserId = params.userId as string;
  const { disconnectWebSocket } = useWebSocket({
    role: 'consultant',
  });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      // Convert Map values to array and sort by consultation_date
      const sortedUsers = Array.from(userLatestCounsels.values()).sort(
        (a, b) =>
          new Date(b.consultation_date).getTime() -
          new Date(a.consultation_date).getTime()
      );

      setUniqueUsers(sortedUsers);
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
    disconnectWebSocket();
    console.log('웹소켓 연결 해제');
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
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto p-4'>
        <div className='flex justify-between items-center mb-8'>
          <Title text='목록' />
          <button
            onClick={handleLogout}
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-green transition-all duration-200'
          >
            로그아웃
          </button>
        </div>

        <div className='space-y-4'>
          {uniqueUsers.map((counsel) => {
            const isSelected = currentUserId === counsel.user_id;

            return (
              <button
                key={counsel.user_id}
                onClick={() => handleUserClick(counsel.user_id)}
                className={`
                  w-full p-4 rounded-lg transition-all duration-200
                  group relative overflow-hidden
                  ${
                    isSelected
                      ? 'bg-main-green/5 border-2 border-main-green shadow-md'
                      : 'bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-main-green/30'
                  }
                `}
              >
                {isSelected && (
                  <div className='absolute left-0 top-0 w-1 h-full bg-main-green' />
                )}

                <div className='flex flex-col'>
                  <div className='flex justify-between items-start mb-2'>
                    <div className='flex items-center gap-2'>
                      <h3
                        className={`text-lg font-semibold ${
                          isSelected ? 'text-main-green' : 'text-gray-900'
                        }`}
                      >
                        {userData[counsel.user_id] || 'Unknown User'}
                      </h3>
                    </div>
                    <span className='text-sm text-gray-500'>
                      {formatDate(counsel.consultation_date)}
                    </span>
                  </div>

                  <p
                    className={`text-base line-clamp-2 ${
                      isSelected ? 'text-main-green' : 'text-gray-700'
                    }`}
                  >
                    {counsel.consultation_title}
                  </p>

                  <div
                    className={`mt-2 flex items-center text-sm ${
                      isSelected ? 'text-main-green' : 'text-gray-500'
                    }`}
                  ></div>
                </div>
              </button>
            );
          })}

          {uniqueUsers.length === 0 && (
            <div className='flex items-center justify-center h-40 bg-white rounded-lg border border-gray-200'>
              <p className='text-gray-500 text-center'>상담 내역이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
