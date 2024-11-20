'use client';

import { Counsel } from '@/app/admin/types/adminTypes';
import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { useFormattedDate } from '@/hooks/useFormattedDate';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchAllData } from '@/lib/api';
import Title from './AdminTitle';

// Types
interface UserData {
  [key: string]: string;
}

// Constants
const SKELETON_COUNT = 3;

export default function AdminHeader() {
  const router = useRouter();
  const { counselData, setSelectedUserId, fetchCounselData } = useCounsel();
  const { session, logout } = useAdminSession();
  const { userId: currentUserId } = useParams<{ userId: string }>();
  const { formatDateLong } = useFormattedDate();

  // State
  const [uniqueUsers, setUniqueUsers] = useState<Counsel[]>([]);
  const [userData, setUserData] = useState<UserData>({});
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const users = await fetchAllData<{ id: string; user_name: string }>(
          'user'
        );
        const userMap = users.reduce((acc, user) => {
          acc[user.id] = user.user_name;
          return acc;
        }, {} as UserData);
        setUserData(userMap);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    if (mounted) {
      loadUserData();
    }
  }, [mounted]);

  useEffect(() => {
    const loadCounselData = async () => {
      try {
        await fetchCounselData();
      } catch (error) {
        console.error('Failed to load counsel data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (mounted) {
      loadCounselData();
    }
  }, [mounted, fetchCounselData]);

  useEffect(() => {
    if (counselData.length > 0 && session.loginUser?.id && mounted) {
      const userLatestCounsels = new Map<string, Counsel>();

      counselData
        .filter((item: Counsel) => item.agent_id === session.loginUser?.id)
        .forEach((counsel: Counsel) => {
          const existingCounsel = userLatestCounsels.get(counsel.user_id);
          if (
            !existingCounsel ||
            new Date(counsel.consultation_date) >
              new Date(existingCounsel.consultation_date)
          ) {
            userLatestCounsels.set(counsel.user_id, counsel);
          }
        });

      const sortedUsers = Array.from(userLatestCounsels.values()).sort(
        (a: Counsel, b: Counsel) =>
          new Date(b.consultation_date).getTime() -
          new Date(a.consultation_date).getTime()
      );

      setUniqueUsers(sortedUsers);
    }
  }, [counselData, session.loginUser?.id, mounted]);

  // Handlers
  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    router.push(`/admin/${encodeURIComponent(userId)}`, { scroll: false });
  };

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  // Render functions
  const renderSkeletonUI = () => (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto p-4'>
        <div className='animate-pulse'>
          <div className='h-8 bg-gray-200 rounded w-1/4 mb-8'></div>
          <div className='space-y-4'>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div key={i} className='h-24 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoginMessage = () => (
    <div className='flex items-center justify-center h-screen'>
      <p className='align-middle text-center text-gray-500 py-4'>
        로그인 하세요.
      </p>
    </div>
  );

  // Conditional renders
  if (!mounted || isLoading) return renderSkeletonUI();
  if (!session.loginUser) return renderLoginMessage();

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
                  w-full p-4 rounded-lg transition-all duration-200 group relative overflow-hidden
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
                      {formatDateLong(counsel.consultation_date)}
                    </span>
                  </div>
                  <p
                    className={`text-base line-clamp-2 ${
                      isSelected ? 'text-main-green' : 'text-gray-700'
                    }`}
                  >
                    {counsel.consultation_title}
                  </p>
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
