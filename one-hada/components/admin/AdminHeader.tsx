'use client';

import { useCounsel } from '@/context/admin/CounselContext';
import { useAdminSession } from '@/context/admin/SessionContext';
import { useFormattedDate } from '@/hooks/useFormattedDate';
import { useWebSocket } from '@/hooks/useWebsocket';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Title from './AdminTitle';

interface ConsultationSummary {
  userId: number;
  userName: string;
  lastConsultationDate: string;
  lastConsultationTitle: string;
}

const SKELETON_COUNT = 3;

export default function AdminHeader() {
  const router = useRouter();
  const {
    setSelectedUserId,
    consultationList,
    fetchConsultationList,
    isLoading,
  } = useCounsel();
  const { session, logout } = useAdminSession();
  const { disconnectWebSocket } = useWebSocket({ role: 'consultant' });
  const { userId: currentUserId } = useParams<{ userId: string }>();
  const { formatDateLong } = useFormattedDate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadConsultationList = async () => {
      if (!session.loginUser?.id || !mounted) return;
      await fetchConsultationList(session.loginUser.id);
    };

    loadConsultationList();
  }, [mounted, session.loginUser?.id, fetchConsultationList]);

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId.toString());
    router.push(`/admin/${encodeURIComponent(userId.toString())}`, {
      scroll: false,
    });
  };

  const handleLogout = async () => {
    try {
      await disconnectWebSocket();
      sessionStorage.setItem('wsConnected', 'false');
      logout();
      console.log('웹소켓 연결 해제 및 로그아웃 완료');
      router.push('/admin');
    } catch (error) {
      console.error('로그아웃 중 웹소켓 오류:', error);
    }
  };

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
          {consultationList.map((consultation: ConsultationSummary) => {
            const isSelected = currentUserId === consultation.userId.toString();
            return (
              <button
                key={consultation.userId}
                onClick={() => handleUserClick(consultation.userId)}
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
                        {consultation.userName}
                      </h3>
                    </div>
                    <span className='text-sm text-gray-500'>
                      {formatDateLong(consultation.lastConsultationDate)}
                    </span>
                  </div>
                  <p
                    className={`text-base line-clamp-2 ${
                      isSelected ? 'text-main-green' : 'text-gray-700'
                    }`}
                  >
                    {consultation.lastConsultationTitle}
                  </p>
                </div>
              </button>
            );
          })}
          {consultationList.length === 0 && (
            <div className='flex items-center justify-center h-40 bg-white rounded-lg border border-gray-200'>
              <p className='text-gray-500 text-center'>상담 내역이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
